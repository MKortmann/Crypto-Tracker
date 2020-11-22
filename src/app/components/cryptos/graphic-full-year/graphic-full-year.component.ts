import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';

import { CoinPaprikaService } from '../../../services/coin-paprika.service';

import { ExchangeService } from '../../../services/exchange.service';

import { TranslateService } from '@ngx-translate/core';

import { options } from './graphic-options';
import { hash } from '../../../tools/currency-hash';

import { SelectItem } from 'primeng/api';

import { Chart } from 'chart.js';
import 'chartjs-plugin-annotation';

import 'chartjs-plugin-zoom';

@Component({
  selector: 'app-graphic-full-year',
  templateUrl: './graphic-full-year.component.html',
  styleUrls: ['./graphic-full-year.component.scss'],
})
export class GraphicFullYearComponent implements OnInit, OnChanges {
  @Input() zoomGraph: boolean;
  coinName = 'btc-bitcoin';
  symbol = 'btc';
  show = false;
  options = options;
  arrayAverageCurrentYearGraph: any;
  setActive = true;
  public chartCoin: Chart;
  labels = [];
  labelsGraphX = [];
  labelsFullYearGraphX = [];
  data = [];

  startDate: string = new Date().toISOString().split('T')[0];
  lastYear = parseInt(this.startDate.split('-')[0], 10) - 1;
  lastTwoYears = this.lastYear - 1;
  start = this.startDate.split('-')[0] + '-01-01';
  end = new Date().toISOString().split('T')[0];
  placeholder: any;
  exchanges: SelectItem[];
  @Input() selectedExchange;
  @Input() selectRate;
  todayDate = new Date();
  url = `https://api.coinpaprika.com/v1/coins/${this.coinName}/ohlcv/historical?start=`;

  // for mobile
  showInSmallScreens = false;

  constructor(
    private coinPaprikaService: CoinPaprikaService,
    private exchangeService: ExchangeService,
    private translateService: TranslateService
  ) {}

  ngOnChanges() {
    this.options.zoom.enabled = this.zoomGraph;
    this.options.pan.enabled = this.zoomGraph;
    this.fetchDataToPlotGraph(this.url);
  }

  ngOnInit(): void {
    if (screen.width < 1500) {
      this.showInSmallScreens = true;
    }

    if (localStorage.getItem('coinName') !== null) {
      this.coinName = localStorage.getItem('coinName');
      this.symbol = this.coinName.split('-')[0];
    }

    this.exchangeService.onSelectedMoneyChange.subscribe((res) => {
      this.selectedExchange = res[0];
      this.selectRate = res[1];
      this.fetchDataToPlotGraph(this.url);
    });

    this.coinPaprikaService.onSelectedCoinChange.subscribe(
      (name) => {
        this.saveCoinName(name);
        this.fetchDataToPlotGraph(this.url);
      },
      (error) => {
        console.log(error);
      }
    );

    console.log('ulr', this.url);

    this.fetchDataToPlotGraph(this.url);
  }

  saveCoinName(name) {
    const nameTemp = name.split('-');
    // update url in accord to the selected coin
    this.url = `https://api.coinpaprika.com/v1/coins/${name}/ohlcv/historical?start=`;

    if (nameTemp[2] !== undefined) {
      this.coinName = `${nameTemp[1]} ${nameTemp[2]}`;
    } else {
      this.coinName = nameTemp[1];
    }
    this.symbol = nameTemp[0];
  }

  setURL() {
    const urlRange = `${this.url}${this.start}&end=${this.end}`;
    if (this.coinName.split('-')[1] !== undefined) {
      this.coinName = this.coinName.split('-')[1];
    }

    return urlRange;
  }

  private calcAverage(res, arrayToPush) {
    const arrayAverage = [];
    for (const item of res) {
      const average = (((item.high + item.low) / 2) * this.selectRate).toFixed(
        2
      );
      arrayToPush.push(item.time_open);
      arrayAverage.push(average);
    }
    return arrayAverage;
  }

  fetchDataToPlotGraph(url) {
    const urlRange = this.setURL();

    this.coinPaprikaService.getDataFromMultipleYears(urlRange).subscribe(
      (res) => {
        // adjusting the input data
        this.labelsGraphX = [];
        this.labelsFullYearGraphX = [];
        let arrayAverageLastYearGraph = [];
        let dataAverageArrayLastTwoYearsGraph = [];
        this.arrayAverageCurrentYearGraph = [];
        this.show = true;

        this.arrayAverageCurrentYearGraph = this.calcAverage(
          res[0],
          this.labelsGraphX
        );
        arrayAverageLastYearGraph = this.calcAverage(
          res[1],
          this.labelsFullYearGraphX
        );
        dataAverageArrayLastTwoYearsGraph = this.calcAverage(
          res[2],
          dataAverageArrayLastTwoYearsGraph
        );

        this.plotGraph(
          this.arrayAverageCurrentYearGraph,
          arrayAverageLastYearGraph,
          dataAverageArrayLastTwoYearsGraph,
          this.labelsGraphX
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  plotGraph(
    arrayAverageCurrentYearGraph,
    dataLastYear,
    dataLastTwoYears,
    labels
  ) {
    if (this.chartCoin) {
      this.chartCoin.destroy();
    }
    this.updateOptions(arrayAverageCurrentYearGraph);

    this.chartCoin = new Chart('canvasDashboardCoin', {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: `${this.symbol}'${this.lastTwoYears.toString().slice(2)}`,
            data: dataLastTwoYears,
            fill: false,
            borderColor: '#97b4d8',
            pointRadius: 3,
            pointHoverBorderColor: '#97b4d8',
            pointHoverRadius: 10,
            pointHoverBorderWidth: 7,
            hidden: true,
          },
          {
            label: `${this.symbol}'${this.lastYear.toString().slice(2)}`,
            data: dataLastYear,
            fill: false,
            borderColor: '#E0777D',
            pointRadius: 3,
            pointHoverBorderColor: '#E0777D',
            pointHoverRadius: 10,
            pointHoverBorderWidth: 7,
            hidden: false,
          },
          {
            label: `${this.symbol}'20`,
            data: arrayAverageCurrentYearGraph,
            fill: false,
            borderColor: '#9BC53D',
            pointRadius: 3,
            pointHoverBorderColor: 'red',
            pointHoverRadius: 10,
            pointHoverBorderWidth: 7,
          },
        ],
      },
      options: this.options,
    });
  }

  updateOptions(data) {
    let valueAverageAnnotation = 0;
    data.forEach((item) => {
      valueAverageAnnotation += parseFloat(item);
    });

    valueAverageAnnotation = valueAverageAnnotation / data.length;

    this.options.annotation.annotations[0].label.content = `${this.translateService.instant(
      'TRANSLATE.GRAPH_COIN.AVERAGE'
    )}: ${valueAverageAnnotation.toFixed(2)} ${hash[this.selectedExchange]}`;
    this.options.annotation.annotations[0].value = valueAverageAnnotation;

    (this.options.tooltips.callbacks.label = (tooltipItem, dataIn) => {
      const label = dataIn.datasets[tooltipItem.datasetIndex].label || '';
      return `${label}: ${tooltipItem.yLabel} ${this.selectedExchange}`;
    }),
      (this.options.scales.yAxes[0].ticks.callback = (value) => {
        if (value >= 10 ** 1 && value < 10 ** 5) {
          return `${hash[this.selectedExchange]}${Math.round(value)}`;
        } else if (value >= 10 ** 5 && value <= 10 ** 8) {
          return `${hash[this.selectedExchange]}${Math.round(
            value / 10 ** 3
          )} K`;
        } else if (value >= 10 ** 8 && value <= 10 ** 11) {
          return `${hash[this.selectedExchange]}${Math.round(
            value / 10 ** 6
          )} M`;
        } else if (value >= 10 ** 11 && value <= 10 ** 15) {
          return `${hash[this.selectedExchange]}${Math.round(
            value / 10 ** 9
          )} B`;
        } else if (value >= 10 ** 15 && value <= 10 ** 18) {
          return `${hash[this.selectedExchange]}${Math.round(
            value / 10 ** 9
          )} T`;
        } else {
          return `${hash[this.selectedExchange]}${value.toFixed(2)}`;
        }
      });
  }
}
