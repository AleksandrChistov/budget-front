import { BudgetTypes } from '../interfaces/budget-types.enum';
import { OptionName } from '../interfaces/option.interface';

export const budgetTypes: OptionName<BudgetTypes>[] = [
  {
    id: BudgetTypes.REVENUE,
    name: 'Доходы'
  },
  {
    id: BudgetTypes.EXPENSES,
    name: 'Расходы'
  },
  {
    id: BudgetTypes.CAPEX,
    name: 'Инвестиции'
  },
  {
    id: BudgetTypes.CAPITAL,
    name: 'Капитал'
  },
];
