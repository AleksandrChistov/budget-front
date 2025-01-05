import { TransactionTypes } from '../../../shared/enums/transaction.enum';
import { ChartCardData } from '../../../shared/components/chart-card/chart-card.interface';

export interface Reports {
  totals: ReportsTotal[];
  reports: ChartCardData[];
}

export interface ReportsTotal {
  id: number;
  type: TransactionTypes; // TODO: delete if no needed
  title: string;
  plan: number;
  actual: number;
}
