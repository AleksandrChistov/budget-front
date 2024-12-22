import { ReportTypes } from '../enums/reports.enum';

export interface FormData {
  reportType: ReportTypes;
  department: string;
  period: Array<Date>;
}
