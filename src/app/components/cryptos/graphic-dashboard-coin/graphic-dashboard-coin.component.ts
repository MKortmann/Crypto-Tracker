import { Component, OnInit, ViewChild } from '@angular/core';

import { CoinPaprikaService } from '../../../services/coin-paprika.service';

import { ExchangeService } from '../../../services/exchange.service';

import { TranslateService } from '@ngx-translate/core';

import { options } from './graphic-options';
import { hash } from '../../../tools/currency-hash';

import { SelectItem } from 'primeng/api';
import { Calendar } from 'primeng/calendar';

import { Chart } from 'chart.js';
import 'chartjs-plugin-annotation';

import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-graphic-dashboard-coin',
  templateUrl: './graphic-dashboard-coin.component.html',
  styleUrls: ['./graphic-dashboard-coin.component.scss'],
})
export class GraphicDashboardCoinComponent implements OnInit {
  coinName = 'btc-bitcoin';
  symbol = 'btc';
  show = false;
  options = options;
  dataAverageArrayGraph: any;
  expandGraph = true;
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
  selectedExchange: any = 'USD';
  selectRate = 1;
  selectRateEUR: any;
  todayDate = new Date();
  url: string;
  // hash = hash;

  // calendar
  selectedDateRange = null;
  @ViewChild('idToClose') idToClose: Calendar;
  counter = 0;

  // for mobile
  showInSmallScreens = false;

  constructor(
    private coinPaprikaService: CoinPaprikaService,
    private exchangeService: ExchangeService,
    private translateService: TranslateService
  ) {}

  // so the calendar will close automatically after select two values
  closeCalendarDialog(event) {
    this.counter++;
    if (this.counter === 2) {
      this.idToClose.hideOverlay();
      this.counter = 0;
      this.fetchDataToPlot(this.url);
    }
  }

  ngOnInit(): void {
    if (screen.width < 1500) {
      this.showInSmallScreens = true;
    }

    // localStorage Check the selectedExchange
    this.selectedExchange = localStorage.getItem('selectedExchange');
    this.expandGraph = JSON.parse(localStorage.getItem('expandGraph'));

    this.exchangeService.getMoney('USD').subscribe(
      (res) => {
        const array = Object.entries(res.rates);
        this.exchanges = array.map(([lat, lng]) => ({
          label: lat,
          value: lng,
        }));

        // checkLocalStorage
        if (this.selectedExchange !== null) {
          this.selectRate = res.rates[this.selectedExchange];
        } else {
          this.selectedExchange = 'USD';
        }
      },
      (error) => console.log(error)
    );

    this.url = `https://api.coinpaprika.com/v1/coins/${this.coinName}/ohlcv/historical?start=`;

    this.adjustPlaceholderCalendar();

    this.coinPaprikaService.onSelectedCoinChange.subscribe(
      (name) => {
        this.setName(name);

        this.fetchDataToPlot(this.url);
      },
      (error) => {
        console.log(error);
      }
    );

    this.fetchDataToPlot(this.url);
  }

  setName(name) {
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

  // change the coin, so we fetch the data again!
  selection(event, dd) {
    this.selectedExchange = dd.selectedOption.label;
    this.selectRate = event.value;
    this.fetchDataToPlot(this.url);
    localStorage.setItem('selectedExchange', this.selectedExchange);
    this.exchangeService.changeMoney(this.selectedExchange);
  }

  setURL() {
    if (this.selectedDateRange !== null) {
      this.start = this.selectedDateRange[0].toISOString().split('T')[0];
      this.end = this.selectedDateRange[1].toISOString().split('T')[0];
    }

    const urlRange = `${this.url}${this.start}&end=${this.end}`;
    if (this.coinName.split('-')[1] !== undefined) {
      this.coinName = this.coinName.split('-')[1];
    }

    return urlRange;
  }

  expand() {
    this.expandGraph = !this.expandGraph;
    localStorage.setItem('expandGraph', JSON.stringify(this.expandGraph));
    if (this.expandGraph) {
      this.chartCoin.data.labels = this.labelsFullYearGraphX;
    } else {
      this.chartCoin.data.labels = this.labelsGraphX;
    }
    this.chartCoin.update();

    // this.fetchDataToPlot(this.url);
  }

  fetchDataToPlot(url) {
    const urlRange = this.setURL();

    this.coinPaprikaService.getDataFromMultipleYears(urlRange).subscribe(
      (res) => {
        // adjusting the input data
        this.labelsGraphX = [];
        this.labelsFullYearGraphX = [];
        let dataAverageArrayLastYearGraph = [];
        let dataAverageArrayLastTwoYearsGraph = [];
        this.dataAverageArrayGraph = [];

        // calc the average with FIAT rate
        this.dataAverageArrayGraph = res[0].map((obj, index) => {
          const average = (
            ((obj.high + obj.low) / 2) *
            this.selectRate
          ).toFixed(2);
          this.labelsGraphX.push(obj.time_open);
          return average;
        });
        // calc the average with FIAT rate
        dataAverageArrayLastYearGraph = res[1].map((obj, index) => {
          const averageLastYear = (
            ((obj.high + obj.low) / 2) *
            this.selectRate
          ).toFixed(2);
          this.labelsFullYearGraphX.push(obj.time_open);
          return averageLastYear;
        });
        // calc the average with FIAT rate
        dataAverageArrayLastTwoYearsGraph = res[2].map((obj, index) => {
          const averageLastTwoYears = (
            ((obj.high + obj.low) / 2) *
            this.selectRate
          ).toFixed(2);
          return averageLastTwoYears;
        });

        this.show = true;

        this.plotGraph(
          this.dataAverageArrayGraph,
          dataAverageArrayLastYearGraph,
          dataAverageArrayLastTwoYearsGraph,
          this.labelsGraphX,
          this.labelsFullYearGraphX
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // adjust the calender input to show the correct data
  adjustPlaceholderCalendar() {
    const placeholderStart = `${this.start.split('-')[2]}.${
      this.start.split('-')[1]
    }.${this.start.split('-')[0]}`;
    const placeholderEnd = `${this.end.split('-')[2]}.${
      this.end.split('-')[1]
    }.${this.end.split('-')[0]}`;
    this.placeholder = `${placeholderStart}-${placeholderEnd}`;
  }

  plotGraph(
    data,
    dataLastYear,
    dataLastTwoYears,
    labels,
    labelsFullYearGraphX
  ) {
    if (this.chartCoin) {
      this.chartCoin.destroy();
    }
    this.updateOptions(data);

    this.chartCoin = new Chart('canvasDashboardCoin', {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: `${this.symbol}'20`,
            data,
            fill: false,
            borderColor: '#9BC53D',
            pointRadius: 3,
            pointHoverBorderColor: 'red',
            pointHoverRadius: 10,
            pointHoverBorderWidth: 7,
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
        if (value >= 10 ** 3 && value <= 10 ** 6) {
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
