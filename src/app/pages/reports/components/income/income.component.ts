import { Component, input } from '@angular/core';
import { ChartCardComponent } from '../../../../shared/components/chart-card/chart-card.component';
import { TotalCardComponent } from '../../../../shared/components/total-card/total-card.component';
import { ChartCardData } from '../../../../shared/components/chart-card/chart-card.interface';

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
  department = input.required<string | null>();
  period = input.required<Array<Date> | null>();

  public operProfit: ChartCardData = {
    title: "Операционная прибыль",
    plan: [null, 0, 151500, 155000, 165000, 180000, 185000, 190000, 200000, 250000, 275000, 300000],
    fact: [0, 5000, 100500, 150000, 165000, 200000, 185000, 195000, 250000, 350000, 375000, 500550.50],
  }
  public ebitda: ChartCardData = {
    title: "EBITDA",
    plan: [null, 0, 151500, 155000, 165000, 180000, 185000, 190000, 200000, 250000, 275000, 300000],
    fact: [0, 5000, 100500, 150000, 165000, 200000, 185000, 195000, 250000, 350000, 375000, 500550.50],
  }
  public finProfit: ChartCardData = {
    title: "Прибыль до налогов",
    plan: [null, 0, 151500, 155000, 165000, 180000, 185000, 190000, 200000, 250000, 275000, 300000],
    fact: [0, 5000, 100500, 150000, 165000, 200000, 185000, 195000, 250000, 350000, 375000, 500550.50],
  }
  public netProfit: ChartCardData = {
    title: "Чистая прибыль",
    plan: [null, 0, 151500, 155000, 165000, 180000, 185000, 190000, 200000, 250000, 275000, 300000],
    fact: [0, 5000, 100500, 150000, 165000, 200000, 185000, 195000, 250000, 350000, 375000, 500550.50],
  }

}
