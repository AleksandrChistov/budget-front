import { Component, DestroyRef, effect, inject, input, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select } from 'primeng/select';
import { OptionName } from '../../../../shared/interfaces/option.interface';
import { TransactionTypes } from '../../../../shared/enums/transaction.enum';
import { skip } from 'rxjs';

@Component({
  selector: 'app-reports-header',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    Select,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  reportType = input.required<string>();
  reportTypeLabels = input.required<OptionName<TransactionTypes>[]>();
  departmentLabels = input.required<OptionName<number>[]>();
  budgetTitles = input.required<OptionName<number>[]>();
  reportTypeChanged = output<TransactionTypes>();
  departmentChanged = output<number>();
  budgetChanged = output<number>();

  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  formGroup!: FormGroup;

  constructor() {
    effect(() => {
      this.formGroup.get('budget')?.setValue(this.budgetTitles()[this.budgetTitles().length - 1]?.id);
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      reportType: [this.reportType(), Validators.required],
      department: [null],
      budget: [null],
    })

    this.formGroup.get('reportType')?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((reportType: TransactionTypes) => this.reportTypeChanged.emit(reportType));

    this.formGroup.get('department')?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((department: number) => this.departmentChanged.emit(department));

    this.formGroup.get('budget')?.valueChanges
      .pipe(skip(1), takeUntilDestroyed(this.destroyRef))
      .subscribe((budget: number) => this.budgetChanged.emit(budget));
  }

}
