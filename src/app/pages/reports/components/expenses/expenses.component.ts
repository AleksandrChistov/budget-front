import { Component, input } from '@angular/core';
import { ChartCardComponent } from '../../../../shared/components/chart-card/chart-card.component';
import { TotalCardComponent } from '../../../../shared/components/total-card/total-card.component';
import { ChartCardData } from '../../../../shared/components/chart-card/chart-card.interface';
import { ReportsTotal } from '../../interfaces/reports.interface';

@Component({
  selector: 'app-reports-expenses',
  standalone: true,
  imports: [
    ChartCardComponent,
    TotalCardComponent
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent {
  department = input.required<number | null>();
  period = input.required<Date[] | null>();
  totals = input.required<ReportsTotal[]>();
  reports = input.required<ChartCardData[]>();
}
