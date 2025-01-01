import { ReportTypes } from '../enums/reports.enum';

export interface ReportsTotal {
  id: number;
  type: ReportTypes; // TODO: delete if no needed
  title: string;
  plan: number;
  actual: number;
}
