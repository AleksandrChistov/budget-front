import { BudgetTypes } from '../../../shared/interfaces/budget-types.enum';

export interface Budget {
  id: number;
  type: BudgetTypes;
  name: string;
  budgetItems: BudgetTreeNode[];
  totals: BudgetData;
}

export interface BudgetTreeNode {
  data: BudgetData;
  children?: BudgetTreeNode[];
}

interface BudgetData {
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
