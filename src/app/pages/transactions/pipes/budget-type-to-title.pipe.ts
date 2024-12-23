import { Pipe, PipeTransform } from '@angular/core';
import { BudgetTypes } from '../../budgets/enums/budget.enum';

@Pipe({
  name: 'budgetTypeToTitle',
  standalone: true
})
export class BudgetTypeToTitlePipe implements PipeTransform {

  transform(budgetType: BudgetTypes, ...args: unknown[]): unknown {
    switch (budgetType) {
      case BudgetTypes.REVENUE:
        return 'Доходы';
      case BudgetTypes.EXPENSES:
        return 'Расходы';
      case BudgetTypes.CAPEX:
        return 'Инвестиции';
      case BudgetTypes.CAPITAL:
        return 'Капитал';
      default:
        return 'Без группы';
    }
  }
}
