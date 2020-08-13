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

  ngOnInit(): void {
    this.coinPaprikaService.onSelectedCoinChange.subscribe(() => {
      console.log('coin changed!');
    });
    this.getCoinByTicker();
  }

  getCoinByTicker(
    coin = 'btc-bitcoin',
    start = '2019-01-01',
    end = '2019-01-20'
  ) {
    this.coinPaprikaService
      .selectedCoinByTickers(coin, start, end)
      .subscribe((res) => {
        const labels = res.map((item) => item.timestamp);
        const price = res.map((item) => item.price);
        const volume24h = res.map((item) => item.timestamp);
        const marketCap = res.map((item) => item.marketCap);
        this.graph(labels, price, volume24h, marketCap);
      });
  }

  graph(labels, price, volume24h, marketCap) {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
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
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              display: true,
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
