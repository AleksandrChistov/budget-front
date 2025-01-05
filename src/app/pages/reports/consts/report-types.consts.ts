import { OptionName } from '../../../shared/interfaces/option.interface';
import { TransactionTypes } from '../../../shared/enums/transaction.enum';

export const reportsTypes: OptionName<TransactionTypes>[] = [
  {
    id: TransactionTypes.EXPENSE,
    name: 'Расходы',
  },
  {
    id: TransactionTypes.INCOME,
    name: 'Доходы',
  },
];
