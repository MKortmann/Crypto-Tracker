import { Component, OnInit } from '@angular/core';

import { CoinPaprikaService } from '../../../services/coin-paprika.service';
import { ChartModule } from 'primeng/chart';

import { ExchangeService } from '../../../services/exchange.service';

import { TranslateService } from '@ngx-translate/core';

import { Chart } from 'chart.js';
import { hash } from '../../../tools/currency-hash';

import 'chartjs-plugin-annotation';

@Component({
  selector: 'app-graphic-dashboard-tickers',
  templateUrl: './graphic-dashboard-tickers.component.html',
  styleUrls: ['./graphic-dashboard-tickers.component.scss'],
})
export class GraphicDashboardTickersComponent implements OnInit {
  constructor(
    private coinPaprikaService: CoinPaprikaService,
    private exchangeService: ExchangeService,
    private translateService: TranslateService
  ) {}

  chart = [];
  labels = ['january', 'february', 'march'];
  data = [30, 60, 100];
  selectedExchange: any = 'USD';
  valueAverageAnnotation = 0;

  coinName = 'btc-bitcoin';
  symbol = 'btc';

  ngOnInit(): void {
    this.coinPaprikaService.onSelectedCoinChange.subscribe(
      (name) => {
        const nameTemp = name.split('-');
        this.coinName = name;
        this.symbol = nameTemp[0];
        this.updateUrl();
      },
      (error) => console.log(error)
    );
    this.updateUrl();
  }

  updateUrl() {
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
        this.valueAverageAnnotation = 0;
        const labels = res.map((item) => item.timestamp);
        const price = res.map((item) => {
          this.valueAverageAnnotation += parseFloat(item.price);
          return item.price;
        });
        this.valueAverageAnnotation =
          this.valueAverageAnnotation / labels.length;

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
            label: `${this.symbol}-24h`,
            data: price,
            borderColor: '#9BC53D',
            fill: false,
            pointHoverBorderColor: 'red',
            pointHoverRadius: 10,
            pointHoverBorderWidth: 7,
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
        drawTime: 'afterDatasetsDraw',
        annotation: {
          drawTime: 'afterDatasetsDraw',
          annotations: [
            {
              id: 'a-line-2',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: `${this.valueAverageAnnotation}`,
              borderColor: '#9BC53D',
              borderWidth: 2,
              borderDash: [10, 5],
              label: {
                backgroundColor: '#9BC53D',
                content: `${this.translateService.instant(
                  'TRANSLATE.GRAPH_COIN.AVERAGE'
                )}: ${this.valueAverageAnnotation.toFixed(2)} ${
                  hash[this.selectedExchange]
                }`,
                enabled: true,
              },
            },
          ],
        },
        tooltips: {
          titleFontSize: 18,
          bodyFontSize: 16,
          // backgroundColor: '#4bc0c0',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          callbacks: {
            title: (tooltipItems, data) => {
              let returnValue = tooltipItems[0].xLabel;
              // converting to our timezone!
              returnValue = new Date(returnValue).toLocaleString().slice(0, -3);
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
          labels: {
            fontColor: '#9bc53d',
            fontSize: 16,
          },
          onHover: (e) => {
            e.target.style.cursor = 'pointer';
          },
        },
        hover: {
          function(e) {
            const point = this.getElementAtEvent(e);
            if (point.length) {
              e.target.style.cursor = 'pointer';
            } else {
              e.target.style.cursor = 'default';
            }
          },
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                color: '#4bc0c0',
                borderDash: [10, 5],
              },
              ticks: {
                fontColor: '#4bc0c0',
                // Include a dollar sign in the ticks
                callback: (value) => {
                  if (value >= 10 ** 3 && value <= 10 ** 6) {
                    return `${hash[this.selectedExchange]}${Math.round(
                      value / 10 ** 3
                    )} K `;
                  } else if (value >= 10 ** 6 && value <= 10 ** 9) {
                    return `${hash[this.selectedExchange]}${Math.round(
                      value / 10 ** 6
                    )} M`;
                  } else if (value >= 10 ** 9 && value <= 10 ** 12) {
                    return `${hash[this.selectedExchange]}${Math.round(
                      value / 10 ** 9
                    )} B`;
                  } else if (value >= 10 ** 12 && value <= 10 ** 15) {
                    return `${hash[this.selectedExchange]}${Math.round(
                      value / 10 ** 9
                    )} T`;
                  }
                  return `${hash[this.selectedExchange]}${value}`;
                },
              },
            },
          ],
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
        },
      },
    });
  }
}
