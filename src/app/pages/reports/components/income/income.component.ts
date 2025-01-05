import { Component, input } from '@angular/core';
import { ChartCardComponent } from '../../../../shared/components/chart-card/chart-card.component';
import { TotalCardComponent } from '../../../../shared/components/total-card/total-card.component';
import { ChartCardData } from '../../../../shared/components/chart-card/chart-card.interface';
import { ReportsTotal } from '../../interfaces/reports.interface';

@Component({
  selector: 'app-reports-income',
  standalone: true,
  imports: [
    ChartCardComponent,
    TotalCardComponent,
  ],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent {
  totals = input.required<ReportsTotal[]>();
  reports = input.required<ChartCardData[]>();
}
