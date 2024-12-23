import { ReportTypes } from '../enums/reports.enum';

export interface FormData {
  reportType: ReportTypes;
  department: number;
  period: Array<Date>;
}
