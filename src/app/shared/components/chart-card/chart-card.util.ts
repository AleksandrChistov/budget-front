import { ChartData, ChartOptions } from 'chart.js';

export function prepareChartData(dataPlan: Array<number | null>, dataFact: Array<number | null>): ChartData {
  return {
    labels: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
    datasets: [
      {
        label: 'План',
        data: dataPlan ?? [],
        borderWidth: 1,
        borderColor: "#007AFF",
        backgroundColor: "#007AFF",
      },
      {
        label: 'Факт',
        data: dataFact ?? [],
        borderWidth: 1,
        borderColor: "#1B2128",
        backgroundColor: "#1B2128",
      }
    ]
  };
}

export function prepareChartOptions(title: string): ChartOptions {
  return {
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 7,
          boxHeight: 7,
        }
      },
      title: {
        text: title ?? "Не задан заголовок",
        display: true,
        position: "top",
        align: "start",
        font: {
          size: 16,
          family: "Inter",
          weight: "normal",
        },
        padding: {
          bottom: -5,
        }
      },
    },
  };
}
