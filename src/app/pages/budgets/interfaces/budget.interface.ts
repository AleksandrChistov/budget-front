import { TransactionTypes } from '../../../shared/enums/transaction.enum';

export interface Budget {
  id: number;
  budgetItems: BudgetTreeNode[];
  totals: BudgetData;
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
