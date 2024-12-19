import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { IncomeComponent } from '../../income/income.component';
import { ExpensesComponent } from '../../expenses/expenses.component';
import { FormData } from '../../../interfaces/form.interface';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    HeaderComponent,
    IncomeComponent,
    ExpensesComponent
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  reportType = 'income';
  department: string | null = null;
  period: Array<Date> | null = null;

  formDataChanged(formData: FormData): void {
    this.reportType = formData.reportType;
    this.department = formData.department;
    this.period = formData.period;
  }
}
