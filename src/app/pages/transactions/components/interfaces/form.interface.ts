export interface TransactionForm {
  sum: number;
  budgetType: string;
  budgetItem: { id: number, label: string };
  paymentDate: Date;
  account: string;
  counterparty: string;
  description: string;
}
