import { Component, DestroyRef, effect, inject, input, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { Option, OptionName } from '../../../../shared/interfaces/option.interface';
import { FileSelectEvent, FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-budgets-header',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    Select,
    FormsModule,
    Button,
    FileUpload
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  title = input.required<string>();
  departments = input.required<OptionName<number>[]>();
  budgetTitles = input.required<Option<number>[]>();
  departmentChanged = output<number>();
  budgetChanged = output<number>();
  deleteBudget = output<number>();
  saveToExcel = output<void>();
  getFromExcel = output<FileSelectEvent>();

  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  formGroup!: FormGroup;

  constructor() {
    effect(() => {
      this.formGroup.get('budget')?.setValue(this.budgetTitles()[0]?.id);
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      department: [null],
      budget: [null],
    });

    this.formGroup.get('department')?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((department: number) => this.departmentChanged.emit(department));

    this.formGroup.get('budget')?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((budget: number) => this.budgetChanged.emit(budget));
  }

}
