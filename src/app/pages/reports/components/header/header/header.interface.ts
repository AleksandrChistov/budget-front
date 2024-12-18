export interface Option {
  label: string;
  value: string | number;
}

export interface FormData {
  reportType: string;
  department: string;
  period: Array<Date>;
}
