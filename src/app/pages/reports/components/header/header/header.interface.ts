export interface Option {
  name: string;
  value: string;
}

export interface FormData {
  reportType: string;
  department: string;
  period: Array<Date>;
}
