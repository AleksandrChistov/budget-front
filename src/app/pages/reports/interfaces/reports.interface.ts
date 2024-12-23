import { ReportTypes } from '../enums/reports.enum';

export interface ReportsTotal {
  id: number;
  type: ReportTypes;
  title: string;
  plan: number;
  actual: number;
}
