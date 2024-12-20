import { Option } from '../../../shared/interfaces/option.interface';
import { TransactionTypes } from '../enums/transaction.enum';
import { BudgetTypes } from '../enums/budget.enum';
import { AccountTypes } from '../enums/account.enum';

export interface BudgetItem {
  id: number;
  label: string;
  children?: Array<BudgetItem>;
}

export interface AccountOption {
  title: string;
  icon: string;
  children: Array<Option<number>>;
}

export interface Transaction {
  id: number;
  paymentDate: string;
  type: TransactionTypes;
  sum: number;
  description: string;
  counterparty: {
    inn: number;
    name: string;
  }
  budget: {
    id: number;
    type: BudgetTypes;
    item: string;
  }
  account: {
    id: number;
    type: AccountTypes;
    name: string;
  }
}
