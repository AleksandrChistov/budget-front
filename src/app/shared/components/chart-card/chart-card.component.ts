import { Component, input, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { UIChart } from 'primeng/chart';
import { Card } from 'primeng/card';
import { ChartCardData } from './chart-card.interface';
import { prepareChartData, prepareChartOptions } from './chart-card.util';

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [
    UIChart,
    Card
  ],
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.scss'
})
export class ChartCardComponent implements OnInit {
  data = input.required<ChartCardData>();
  chartData!: ChartData;
  options!: ChartOptions;

  ngOnInit() {
    this.chartData = prepareChartData(this.data().plan, this.data().fact);
    this.options = prepareChartOptions(this.data().title);
  }
}
