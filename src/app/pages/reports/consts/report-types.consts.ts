import { OptionName } from '../../../shared/interfaces/option.interface';
import { ReportTypes } from '../enums/reports.enum';

export const reportsTypes: OptionName<ReportTypes>[] = [
  {
    id: ReportTypes.EXPENSE,
    name: 'Расходы',
  },
  {
    id: ReportTypes.INCOME,
    name: 'Доходы',
  },
];
