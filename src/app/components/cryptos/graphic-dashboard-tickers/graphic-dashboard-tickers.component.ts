import { Component, OnInit } from '@angular/core';

import { CoinPaprikaService } from '../../../services/coin-paprika.service';
import { ChartModule } from 'primeng/chart';

import { ExchangeService } from '../../../services/exchange.service';

import { CoinLoreService } from '../../../services/coinLore.service';

import { TranslateService } from '@ngx-translate/core';

import { options } from './graphic-options';
import { hash } from '../../../tools/currency-hash';

import { Chart } from 'chart.js';
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
    private translateService: TranslateService,
    private coinLoreService: CoinLoreService
  ) {}

  public chartTickers: Chart;
  labels = ['january', 'february', 'march'];
  data = [30, 60, 100];
  selectedExchange = 'USD';
  valueAverageAnnotation = 0;

  coinName = 'btc-bitcoin';
  symbol = 'btc';
  options = options;

  endDate: Date;
  startDate: Date;
  endDateStr: string;
  startDateStr: string;

  ngOnInit(): void {
    // localStorage Check the selectedExchange
    this.selectedExchange = localStorage.getItem('selectedExchange');

    this.exchangeService.onSelectedMoneyChange.subscribe((res) => {
      this.selectedExchange = res;
      this.updateUrl();
    });

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

    // here we update the graph data
    this.coinLoreService.cast.subscribe((data) => {
      this.getCoinByTicker(
        this.coinName,
        this.startDateStr,
        this.endDateStr,
        true
      );
    });
  }

  updateUrl() {
    this.endDate = new Date();
    this.endDate.setDate(this.endDate.getDate() + 1);

    this.startDate = new Date();
    // startDate.setDate(startDate.getDate());

    this.endDateStr = this.endDate.toISOString().split('T')[0];
    this.startDateStr = this.startDate.toISOString().split('T')[0];

    this.getCoinByTicker(
      this.coinName,
      this.startDateStr,
      this.endDateStr,
      false
    );
  }

  getCoinByTicker(coin, start, end, update = false) {
    this.coinPaprikaService.selectedCoinByTickers(coin, start, end).subscribe(
      (res) => {
        this.valueAverageAnnotation = 0;
        this.labels = [];
        this.labels = res.map((item) => item.timestamp);
        const price = res.map((item) => {
          this.valueAverageAnnotation += parseFloat(item.price);
          return item.price;
        });
        this.valueAverageAnnotation =
          this.valueAverageAnnotation / this.labels.length;

        const volume24h = res.map((item) => item.timestamp);
        const marketCap = res.map((item) => item.marketCap);
        if (!update) {
          this.plotGraph(this.labels, price, volume24h, marketCap);
        } else {
          this.chartTickers.data.datasets[0].data = price;
          this.chartTickers.data.labels = this.labels;
          this.chartTickers.update();
        }
      },
      (error) => console.log(error)
    );
  }

  plotGraph(labels, price, volume24h, marketCap) {
    this.updateOptions();

    if (this.chartTickers) {
      this.chartTickers.destroy();
    }

    this.chartTickers = new Chart('canvasTickers', {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: `${this.symbol}-24h`,
            data: price,
            borderColor: '#9BC53D',
            fill: false,
            pointRadius: 3,
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
      options: this.options,
    });
  }

  updateOptions() {
    this.options.annotation.annotations[0].label.content = `${this.translateService.instant(
      'TRANSLATE.GRAPH_COIN.AVERAGE'
    )}: ${this.valueAverageAnnotation.toFixed(2)} ${
      hash[this.selectedExchange]
    }`;

    this.options.annotation.annotations[0].value = this.valueAverageAnnotation;

    (this.options.tooltips.callbacks.label = (tooltipItem, dataIn) => {
      const label = dataIn.datasets[tooltipItem.datasetIndex].label || '';
      return `${label}: ${tooltipItem.yLabel} ${this.selectedExchange}`;
    }),
      (this.options.scales.yAxes[0].ticks.callback = (value) => {
        if (value >= 10 ** 5 && value <= 10 ** 6) {
          return `${hash[this.selectedExchange]}${Math.round(
            value / 10 ** 3
          )} K`;
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
        } else {
          return `${hash[this.selectedExchange]}${value}`;
        }
      });
  }
}
