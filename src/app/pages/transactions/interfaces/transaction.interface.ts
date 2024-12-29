import { OptionName } from '../../../shared/interfaces/option.interface';
import { BudgetTypes } from '../../../shared/interfaces/budget-type.enum';
import { TransactionTypes } from '../enums/transaction.enum';
import { AccountTypes } from '../enums/account.enum';

export interface BudgetItem {
  id: number;
  label: string;
  children?: Array<BudgetItem>;
}

export interface AccountResponse {
  id: number;
  name: string;
  type: AccountTypes;
}

export interface AccountOption {
  title: string;
  icon: string;
  children: Array<OptionName<number>>;
}

export interface Transaction {
  id: number;
  sum: number;
  type: TransactionTypes;
  paymentDate: string;
  description: string;
  counterparty: {
    inn: number;
    name: string;
  }
  budgetItem: {
    id: number;
    type: BudgetTypes;
    name: string;
  }
  account: {
    id: number;
    type: AccountTypes;
    name: string;
  }
}
