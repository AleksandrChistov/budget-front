import { Component, input, OnInit } from '@angular/core';
import { UIChart } from 'primeng/chart';
import { ChartData, ChartOptions } from 'chart.js';
import { Card } from 'primeng/card';
import { ChartCardData } from './chart-card.interface';
import { chartData, chartOptions } from './chart-card.data';

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
    chartData.datasets[0].data = this.data().plan;
    chartData.datasets[1].data = this.data().fact;
    chartOptions.plugins.title.text = this.data().title;
    this.chartData = chartData;
    this.options = chartOptions;
  }
}
