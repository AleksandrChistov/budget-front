import { Component, input } from '@angular/core';
import { ChartCardComponent } from '../../../../shared/components/chart-card/chart-card.component';
import { TotalCardComponent } from '../../../../shared/components/total-card/total-card.component';
import { ChartCardData } from '../../../../shared/components/chart-card/chart-card.interface';

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
  department = input.required<string | null>();
  period = input.required<Array<Date> | null>();

  public opex: ChartCardData = {
    title: "Операционные расходы",
    plan: [null, 0, 151500, 155000, 165000, 180000, 185000, 190000, 200000, 250000, 275000, 300000],
    fact: [0, 5000, 100500, 150000, 165000, 200000, 185000, 195000, 250000, 350000, 375000, 500550.50],
  }
  public staff: ChartCardData = {
    title: "Оплата труда",
    plan: [null, 0, 151500, 155000, 165000, 180000, 185000, 190000, 200000, 250000, 275000, 300000],
    fact: [0, 5000, 100500, 150000, 165000, 200000, 185000, 195000, 250000, 350000, 375000, 500550.50],
  }
  public taxes: ChartCardData = {
    title: "Налоги",
    plan: [null, 0, 151500, 155000, 165000, 180000, 185000, 190000, 200000, 250000, 275000, 300000],
    fact: [0, 5000, 100500, 150000, 165000, 200000, 185000, 195000, 250000, 350000, 375000, 500550.50],
  }
  public finex: ChartCardData = {
    title: "Проценты к уплате",
    plan: [null, 0, 151500, 155000, 165000, 180000, 185000, 190000, 200000, 250000, 275000, 300000],
    fact: [0, 5000, 100500, 150000, 165000, 200000, 185000, 195000, 250000, 350000, 375000, 500550.50],
  }

}
