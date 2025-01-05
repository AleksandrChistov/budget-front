import { TransactionTypes } from '../enums/transaction.enum';
import { BudgetTypes } from '../interfaces/budget-types.enum';
import { OptionName } from '../interfaces/option.interface';
import { budgetTypes } from '../consts/budget-types.const';

export function getBudgetTypeOptions(type: TransactionTypes): OptionName<BudgetTypes>[] {
  const excludedType = type === TransactionTypes.INCOME ? BudgetTypes.EXPENSES : BudgetTypes.REVENUE;
  return budgetTypes.filter(t => t.id != excludedType);
}
