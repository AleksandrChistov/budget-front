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
  reportTypeLabels = input.required<OptionName<TransactionTypes>[]>();
  departmentLabels = input.required<OptionName<number>[]>();
  budgetTitles = input.required<OptionName<number>[]>();
  yearLabels = input.required<OptionName<number>[]>();
  budgetId = input.required<number | undefined>();
  reportTypeChanged = output<TransactionTypes>();
  yearChanged = output<number>();
  departmentChanged = output<number>();
  budgetChanged = output<number>();

  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  formGroup!: FormGroup;

  constructor() {
    effect(() => {
      this.formGroup.get('budget')?.setValue(this.budgetId());
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      reportType: [TransactionTypes.EXPENSE, Validators.required],
      department: [null],
      budget: [null],
      year: [new Date().getFullYear()],
    })

    this.formGroup.get('reportType')?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((reportType: TransactionTypes) => this.reportTypeChanged.emit(reportType));

    this.formGroup.get('year')?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((year: number) => this.yearChanged.emit(year));

    this.formGroup.get('department')?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((department: number) => this.departmentChanged.emit(department));

    this.formGroup.get('budget')?.valueChanges
      .pipe(skip(1), takeUntilDestroyed(this.destroyRef))
      .subscribe((budget: number) => this.budgetChanged.emit(budget));
  }

}
