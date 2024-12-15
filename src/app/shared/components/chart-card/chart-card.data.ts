import { ChartData, ChartOptions } from 'chart.js';

export const chartData: ChartData = {
  labels: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
  datasets: [
    {
      label: 'План',
      data: [],
      borderWidth: 1,
      borderColor: "#007AFF",
      backgroundColor: "#007AFF",
    },
    {
      label: 'Факт',
      data: [],
      borderWidth: 1,
      borderColor: "#1B2128",
      backgroundColor: "#1B2128",
    }
  ]
};

// @ts-ignore
export const chartOptions: ChartOptions & Required<ChartOptions, "plugins.title.text"> = {
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
      text: "Не задан заголовок",
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
