import { Option } from '../../../reports/components/header/header/header.interface';

export interface BudgetItem {
  id: number;
  label: string;
  children?: Array<BudgetItem>;
}

export interface AccountOption {
  title: string;
  icon: string;
  children: Array<Option>;
}
