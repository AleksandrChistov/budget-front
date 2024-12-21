import { Component, DestroyRef, inject, input, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { Option } from '../../../../shared/interfaces/option.interface';

@Component({
  selector: 'app-budgets-header',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    Select,
    FormsModule,
    Button
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  title = input.required<string>();
  departments = input.required<Array<Option<number>>>();
  budgets = input.required<Array<Option<number>>>();
  departmentChanged = output<number>();
  budgetChanged = output<number>();
  saveToExcel = output<void>();
  getFromExcel = output<void>();
  deleteBudget = output<number>();

  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  formGroup!: FormGroup;

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      department: [null],
      budget: [this.budgets()?.[0].id],
    });

    this.formGroup.get('department')?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((department: number) => this.departmentChanged.emit(department));

    this.formGroup.get('budget')?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((budget: number) => this.budgetChanged.emit(budget));
  }

}
