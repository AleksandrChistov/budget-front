import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Option } from '../../../../shared/interfaces/option.interface';
import { LabelsService } from '../../../../shared/services/labels.service';
import { HeaderComponent } from '../header/header.component';
import { IncomeComponent } from '../income/income.component';
import { ExpensesComponent } from '../expenses/expenses.component';
import { FormData } from '../../interfaces/form.interface';
import { ReportTypes } from '../../enums/reports.enum';
import { ReportsTotal } from '../../interfaces/reports.interface';
import { ReportsService } from '../../services/reports.service';
import { ChartCardData } from '../../../../shared/components/chart-card/chart-card.interface';

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
export class ReportsComponent implements OnInit {
  private reportsService = inject(ReportsService);
  private labelsService = inject(LabelsService);
  private destroyRef = inject(DestroyRef);

  departmentLabels = toSignal<Option<number>[], []>(this.labelsService.getDepartments(), { initialValue: [] });
  reportTypesLabels = toSignal<Option<ReportTypes>[], []>(this.labelsService.getReportTypes(), { initialValue: [] });
  totals = signal<ReportsTotal[]>([]);
  reports = signal<ChartCardData[]>([]);

  protected readonly ReportTypes = ReportTypes;

  reportType = ReportTypes.INCOME;
  department: number | null = null;
  period: Array<Date> | null = null;

  ngOnInit() {
    this.getTotals(this.reportType);
    this.getReports(this.reportType);
  }

  formDataChanged(formData: FormData): void {
    console.log('formData > ', formData)
    this.reportType = formData.reportType;
    this.department = formData.department;
    this.period = formData.period;
    this.getTotals(this.reportType, this.department, this.period);
    this.getReports(this.reportType, this.department, this.period);
  }

  private getTotals(reportType: ReportTypes, departmentId?: number, period?: Date[]): void {
    this.reportsService.getTotals(reportType, departmentId, period).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(totals => this.totals.set(totals));
  }

  private getReports(reportType: ReportTypes, departmentId?: number, period?: Date[]): void {
    this.reportsService.get(reportType, departmentId, period).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(reports => this.reports.set(reports));
  }
}
