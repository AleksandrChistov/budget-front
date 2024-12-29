export interface TransactionForm {
  sum: number;
  budgetType: string;
  budgetItem: { id: number, name: string };
  paymentDate: Date;
  account: number;
  counterparty: number;
  description: string;
}
