import { Component, input, output } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeTableModule } from 'primeng/treetable';
import { TableModule } from 'primeng/table';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { Budget, BudgetData, BudgetTreeNode } from '../../interfaces/budget.interface';
import { TransactionTypes } from '../../../../shared/enums/transaction.enum';
import { BudgetTypes } from '../../../../shared/interfaces/budget-types.enum';

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
  budgetType = input.required<BudgetTypes>();
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
    this.changeBudgetItemMonth(id, plan, this.budget().totals, this.budget().budgetItems);
  }

  private changeBudgetItemMonth(id: number, plan: number, totals: BudgetData, children?: BudgetTreeNode[]): void {
    return (children || []).forEach(item => {
      const foundItemIndex = item.data.months.findIndex(month => month.id === id);

      if (foundItemIndex >= 0) {
        item.data.planTotal = this.calculateSum(item.data.planTotal, item.data.months[foundItemIndex].plan, '-');
        item.data.planTotal = this.calculateSum(item.data.planTotal, plan, '+');
        if (item.type == TransactionTypes.INCOME || this.budgetType() === BudgetTypes.EXPENSES) {
          totals.planTotal = this.calculateSum(totals.planTotal, item.data.months[foundItemIndex].plan, '-');
          totals.planTotal = this.calculateSum(totals.planTotal, plan, '+');
        } else {
          totals.planTotal = this.calculateSum(totals.planTotal, item.data.months[foundItemIndex].plan, '+');
          totals.planTotal = this.calculateSum(totals.planTotal, plan, '-');
        }
        if (item.type == TransactionTypes.INCOME || this.budgetType() === BudgetTypes.EXPENSES) {
        totals.months[foundItemIndex].plan = this.calculateSum(totals.months[foundItemIndex].plan, item.data.months[foundItemIndex].plan, '-');
        totals.months[foundItemIndex].plan = this.calculateSum(totals.months[foundItemIndex].plan, plan, '+');
        } else {
          totals.months[foundItemIndex].plan = this.calculateSum(totals.months[foundItemIndex].plan, item.data.months[foundItemIndex].plan, '+');
          totals.months[foundItemIndex].plan = this.calculateSum(totals.months[foundItemIndex].plan, plan, '-');
        }

        if (item.parent) {
          this.changeParent(item.parent, foundItemIndex, plan, item.data.months[foundItemIndex].plan);
        }
        item.data.months[foundItemIndex].plan = plan;
      } else {
        this.changeBudgetItemMonth(id, plan, totals, item.children);
      }
    });
  }

  private changeParent(parent: BudgetTreeNode, index: number, plan: number, prevPlan: number): void {
    parent.data.planTotal = this.calculateSum(parent.data.planTotal, prevPlan, '-');
    parent.data.planTotal = this.calculateSum(parent.data.planTotal, plan, '+');
    if (parent.parent) {
      this.changeParent(parent.parent, index, plan, prevPlan);
    }
    parent.data.months[index].plan = this.calculateSum(parent.data.months[index].plan, prevPlan, '-');
    parent.data.months[index].plan = this.calculateSum(parent.data.months[index].plan, plan, '+');
  }

  private calculateSum(a: number, b: number, sign: '+' | '-'): number {
    switch (sign) {
      case '+':
        return Math.round(100 * (a + b)) / 100;
      case '-':
        return Math.round(100 * (a - b)) / 100;
      default:
        return 0;
    }
  }

}
