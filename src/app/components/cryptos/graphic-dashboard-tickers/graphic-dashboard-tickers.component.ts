import { Component, OnInit } from '@angular/core';

import { CoinPaprikaService } from '../../../services/coin-paprika.service';
import { ChartModule } from 'primeng/chart';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-graphic-dashboard-tickers',
  templateUrl: './graphic-dashboard-tickers.component.html',
  styleUrls: ['./graphic-dashboard-tickers.component.scss'],
})
export class GraphicDashboardTickersComponent implements OnInit {
  constructor(private coinPaprikaService: CoinPaprikaService) {}

  chart = [];
  labels = ['january', 'february', 'march'];
  data = [30, 60, 100];

  coinName = 'btc-bitcoin';
  symbol = 'btc';

  ngOnInit(): void {
    this.coinPaprikaService.onSelectedCoinChange.subscribe(
      (name) => {
        const nameTemp = name.split('-');
        if (nameTemp[2] !== undefined) {
          this.coinName = `${nameTemp[1]} ${nameTemp[2]}`;
        } else {
          this.coinName = nameTemp[1];
        }
        this.symbol = nameTemp[0];
        this.coinName = nameTemp[1];
        console.log('coin changed!');
      },
      (error) => console.log(error)
    );

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1);

    const startDate = new Date();
    // startDate.setDate(startDate.getDate());

    const endDateStr = endDate.toISOString().split('T')[0];
    const startDateStr = startDate.toISOString().split('T')[0];

    this.getCoinByTicker(this.coinName, startDateStr, endDateStr);
  }

  getCoinByTicker(coin, start, end) {
    this.coinPaprikaService.selectedCoinByTickers(coin, start, end).subscribe(
      (res) => {
        console.log(res);
        const labels = res.map((item) => item.timestamp);
        const price = res.map((item) => item.price);
        const volume24h = res.map((item) => item.timestamp);
        const marketCap = res.map((item) => item.marketCap);
        this.graph(labels, price, volume24h, marketCap);
      },
      (error) => console.log(error)
    );
  }

  graph(labels, price, volume24h, marketCap) {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: `${this.symbol}`,
            data: price,
            borderColor: 'rgba(255, 0, 0, 1)',
            fill: false,
          },
          // {
          //   data: volume24h,
          //   borderColor: 'rgba(0, 255, 0, 1)',
          //   fill: false,
          // },
          // {
          //   data: marketCap,
          //   borderColor: 'rgba(0, 0, 255, 1)',
          //   fill: false,
          // },
        ],
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          titleFontSize: 18,
          bodyFontSize: 16,
          // backgroundColor: '#4bc0c0',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          callbacks: {
            title: (tooltipItems, data) => {
              let returnValue = tooltipItems[0].xLabel.split('T')[0];
              returnValue = returnValue.split('-');
              returnValue = `${returnValue[2]}-${returnValue[1]}-${returnValue[0]}`;
              return returnValue;
            },
            label: (tooltipItem, data) => {
              const label = data.datasets[tooltipItem.datasetIndex].label || '';
              return `${label}: ${tooltipItem.yLabel}`;
            },
          },
        },
        legend: {
          display: true,
          fontSize: 16,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                color: '#4bc0c0',
                zeroLineColor: '#4bc0c0',
              },
              type: 'time',
              ticks: {
                fontColor: '#4bc0c0',
              },
              time: {
                unit: 'hour',
              },
            },
          ],
          yAxes: [
            {
              display: true,
            },
          ],
        },
      },
    });
  }
}
