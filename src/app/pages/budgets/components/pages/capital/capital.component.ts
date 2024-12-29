import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import { FileSelectEvent } from 'primeng/fileupload';
import { BudgetService } from '../../../services/budget.service';
import { LabelsService } from '../../../../../shared/services/labels.service';
import { Option, OptionName } from '../../../../../shared/interfaces/option.interface';
import { BudgetTypes } from '../../../../../shared/interfaces/budget-types.enum';
import { Budget } from '../../../interfaces/budget.interface';
import { HeaderComponent } from '../../header/header.component';
import { TableBudgetsComponent } from '../../table-budgets/table-budgets.component';

@Component({
  selector: 'app-capital',
  standalone: true,
  imports: [
    HeaderComponent,
    TableBudgetsComponent
  ],
  templateUrl: './capital.component.html',
  styleUrl: './capital.component.scss'
})
export class CapitalComponent implements OnInit {
  budgetService = inject(BudgetService);
  labelsService = inject(LabelsService);
  destroyRef = inject(DestroyRef);

  departmentLabels = toSignal<OptionName<number>[], []>(this.labelsService.getDepartments(), { initialValue: [] });
  budgetLabels = signal<Option<number>[]>([]);
  budget = signal<Budget>({} as Budget);

  ngOnInit(): void {
    this.getBudgetLabels();
  }

  budgetChanged(id: number): void {
    console.log('budgetChanged ', id);
    if (id) {
      this.budgetService.get(id).pipe(
        take(1),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe((budget: Budget) => this.budget.set(budget));
    }
  }

  departmentChanged(id: number): void {
    this.getBudgetLabels(id);
  }

  saveBudget(budget: Budget): void {
    console.log('saveBudget', budget);
    // TODO: make a request to save a new budget
  }

  deleteBudget(id: number): void {
    console.log('deleteBudget', id);
    // TODO: make a request to delete a budget
  }

  saveToExcel(): void {
    console.log('saveToExcel', this.budget());
    // TODO: make a request to save a budget to excel and download this file
  }

  getFromExcel(event: FileSelectEvent): void {
    console.log('getFromExcel', event);
    // TODO: open a modal to upload excel file
  }

  private getBudgetLabels(departmentId?: number): void {
    console.log('departmentId ', departmentId);
    this.labelsService.getBudgets(BudgetTypes.CAPITAL, departmentId)
      .pipe(
        take(1),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(budgetLabels => this.budgetLabels.set(budgetLabels));
  }
}
