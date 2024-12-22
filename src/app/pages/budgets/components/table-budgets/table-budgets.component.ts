import { Component, input, output } from '@angular/core';
import { TreeTableModule } from 'primeng/treetable';
import { TableModule } from 'primeng/table';
import { Card } from 'primeng/card';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { Budget, BudgetTreeNode } from '../../interfaces/budget.interface';
import { NgIf } from '@angular/common';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-table-budgets',
  standalone: true,
  imports: [
    TreeTableModule,
    TableModule,
    Card,
    FormsModule,
    InputNumber,
    ReactiveFormsModule,
    NgIf,
    Button
  ],
  templateUrl: './table-budgets.component.html',
  styleUrl: './table-budgets.component.scss'
})
export class TableBudgetsComponent {
  budget = input.required<Budget>();
  saveBudget = output<Budget>();

  skipTotal = false;

  frozenCols = [{ field: 'name', header: 'Статьи' }];
  scrollableCols = [
    { field: 'name', header: 'Январь' },
    { field: 'name', header: 'Февраль' },
    { field: 'name', header: 'Март' },
    { field: 'name', header: 'Апрель' },
    { field: 'name', header: 'Май' },
    { field: 'name', header: 'Июнь' },
    { field: 'name', header: 'Июль' },
    { field: 'name', header: 'Август' },
    { field: 'name', header: 'Сентябрь' },
    { field: 'name', header: 'Октябрь' },
    { field: 'name', header: 'Ноябрь' },
    { field: 'name', header: 'Декабрь' },
    { field: 'name', header: 'Итого' },
  ];

  getFormControl(value: number, disabled: boolean = false): FormControl<number | null> {
    return new FormControl({ value: value ?? 0, disabled });
  }

  showTotal() {
    const skip = this.skipTotal;
    this.skipTotal = !this.skipTotal;
    return !skip;
  }

  changeBudgetItem(id: number, planString: string): void {
    const plan = parseFloat(planString.replace(/\s/g, '').replace(',', '.'));
    this.changeBudgetItemMonth(id, plan, this.budget().budgetItems);
  }

  private changeBudgetItemMonth(id: number, plan: number, children?: BudgetTreeNode[]): void {
    children?.find(item => {
      const foundItem = item.data.months.find(month => {
        if (month.id === id) {
          month.plan = plan;
          return true;
        }
        return false;
      });
      if (!foundItem) {
        this.changeBudgetItemMonth(id, plan, item.children);
      }
    });
  }
}
