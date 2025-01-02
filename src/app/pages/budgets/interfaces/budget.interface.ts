export interface Budget {
  budgetItems: BudgetTreeNode[];
  totals: BudgetData;
}

export interface BudgetTreeNode {
  data: BudgetData;
  children?: BudgetTreeNode[];
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
