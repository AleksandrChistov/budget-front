import { BudgetTypes } from '../../../shared/interfaces/budget-types.enum';
import { TransactionTypes } from '../../transactions/enums/transaction.enum';

export interface Budget {
  budgetItems: BudgetTreeNode[];
  totals: BudgetData;
  type: BudgetTypes,
  departmentId: number;
}

export interface BudgetTreeNode {
  data: BudgetData;
  children?: BudgetTreeNode[];
  parent?: BudgetTreeNode;
  type: TransactionTypes;
}

export interface BudgetData {
  id: number;
  name: string;
  actualTotal: number;
  planTotal: number;
  months: BudgetItemMonth[];
}

export interface BudgetItemMonth {
  id: number;
  index: number;
  actual: number;
  plan: number;
}
