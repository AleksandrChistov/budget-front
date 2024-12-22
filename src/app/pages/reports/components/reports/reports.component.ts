import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Option } from '../../../../shared/interfaces/option.interface';
import { LabelsService } from '../../../../shared/services/labels.service';
import { HeaderComponent } from '../header/header.component';
import { IncomeComponent } from '../income/income.component';
import { ExpensesComponent } from '../expenses/expenses.component';
import { FormData } from '../../interfaces/form.interface';
import { ReportTypes } from '../../enums/reports.enum';

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
  private labelsService = inject(LabelsService);

  departmentLabels = toSignal<Option<number>[], []>(this.labelsService.getDepartments(), { initialValue: [] });
  reportTypesLabels = toSignal<Option<ReportTypes>[], []>(this.labelsService.getReportTypes(), { initialValue: [] });

  protected readonly ReportTypes = ReportTypes;

  reportType = ReportTypes.INCOME;
  department: string | null = null;
  period: Array<Date> | null = null;

  formDataChanged(formData: FormData): void {
    this.reportType = formData.reportType;
    this.department = formData.department;
    this.period = formData.period;
  }
}
