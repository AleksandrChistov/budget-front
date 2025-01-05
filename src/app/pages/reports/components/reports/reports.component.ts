import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import { OptionName } from '../../../../shared/interfaces/option.interface';
import { LabelsService } from '../../../../shared/services/labels.service';
import { HeaderComponent } from '../header/header.component';
import { IncomeComponent } from '../income/income.component';
import { ExpensesComponent } from '../expenses/expenses.component';
import { ReportsTotal } from '../../interfaces/reports.interface';
import { ReportsService } from '../../services/reports.service';
import { ChartCardData } from '../../../../shared/components/chart-card/chart-card.interface';
import { reportsTypes } from '../../consts/report-types.consts';
import { BudgetTypes } from '../../../../shared/interfaces/budget-types.enum';
import { TransactionTypes } from '../../../../shared/enums/transaction.enum';

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

  departmentLabels = toSignal<OptionName<number>[], []>(this.labelsService.getDepartments(), { initialValue: [] });
  reportTypesLabels = signal<OptionName<TransactionTypes>[]>(reportsTypes);
  budgetLabels = signal<OptionName<number>[]>([]);
  totals = signal<ReportsTotal[]>([]);
  reports = signal<ChartCardData[]>([]);

  protected readonly ReportTypes = TransactionTypes;

  reportType = TransactionTypes.EXPENSE;
  departmentId!: number;
  budgetId!: number;

  ngOnInit() {
    this.getBudgetLabels(undefined, this.reportType);
  }

  reportTypeChanged(reportType: TransactionTypes): void {
    console.log('reportTypeChanged > ', reportType);
    this.reportType = reportType;
    this.getBudgetLabels(undefined, reportType, this.departmentId);
  }

  departmentChanged(departmentId: number): void {
    console.log('departmentChanged > ', departmentId);
    this.departmentId = departmentId;
    this.getBudgetLabels(undefined, this.reportType, departmentId);
  }

  budgetChanged(budgetId: number): void {
    console.log('budgetChanged > ', budgetId);
    this.budgetId = budgetId;
    this.getReports(this.reportType, budgetId);
  }

  private getBudgetLabels(budgetType?: BudgetTypes, transactionType?: TransactionTypes, departmentId?: number): void {
    console.log('departmentId ', departmentId);
    this.labelsService.getBudgets(budgetType, transactionType, departmentId)
      .pipe(
        take(1),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(budgetLabels => this.budgetLabels.set(budgetLabels));
  }

  private getReports(reportType: TransactionTypes, budgetId: number): void {
    this.reportsService.get(reportType, budgetId)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        console.log('reports', data);
        this.totals.set(data.totals);
        this.reports.set(data.reports);
      });
  }
}
