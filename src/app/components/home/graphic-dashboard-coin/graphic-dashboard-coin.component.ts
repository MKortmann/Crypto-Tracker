import { Component, OnInit, ViewChild } from '@angular/core';

import { CoinPaprikaService } from '../../../services/coin-paprika.service';

import { ExchangeService } from '../../../services/exchange.service';

import { TranslateService } from '@ngx-translate/core';

import 'chartjs-plugin-annotation';

import { options } from './graphic-options';
import { hash } from './currency-hash';

import { SelectItem } from 'primeng/api';
import { Calendar } from 'primeng/calendar';

@Component({
  selector: 'app-graphic-dashboard-coin',
  templateUrl: './graphic-dashboard-coin.component.html',
  styleUrls: ['./graphic-dashboard-coin.component.scss'],
})
export class GraphicDashboardCoinComponent implements OnInit {
  coinDataArray: any;
  data: any;
  coinName = 'btc-bitcoin';
  show = false;
  options = options;
  labelsGraphX: any;
  dataAverageArrayGraph: any;

  startDate = new Date().toISOString().split('T')[0];
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
    this.url = `https://api.coinpaprika.com/v1/coins/${this.coinName}/ohlcv/historical?start=`;
    if (screen.width < 1500) {
      this.showInSmallScreens = true;
    }
    this.exchangeService.getMoney('USD').subscribe(
      (res) => {
        const array = Object.entries(res.rates);
        this.exchanges = array.map(([lat, lng]) => ({
          label: lat,
          value: lng,
        }));
      },
      (error) => console.log(error)
    );

    this.adjustPlaceholderCalendar();

    this.coinPaprikaService.onSelectedCoinChange.subscribe(
      (url) => {
        this.fetchDataToPlot(url);
      },
      (error) => {
        console.log(error);
      }
    );

    this.coinPaprikaService.onSelectCoinName.subscribe(
      (name) => {
        const nameTemp = name.split('-');
        // update url in accord to the selected coin
        this.url = `https://api.coinpaprika.com/v1/coins/${name}/ohlcv/historical?start=`;

        if (nameTemp[2] !== undefined) {
          this.coinName = `${nameTemp[1]} ${nameTemp[2]}`;
        } else {
          this.coinName = nameTemp[1];
        }
      },
      (error) => {
        console.log(error);
      }
    );
    this.fetchDataToPlot(this.url);
  }

  // change the coin, so we fetch the data again!
  selection(event, dd) {
    this.selectedExchange = dd.selectedOption.label;
    this.selectRate = event.value;
    this.fetchDataToPlot(this.url);
  }

  fetchDataToPlot(url) {
    if (this.selectedDateRange !== null) {
      this.start = this.selectedDateRange[0].toISOString().split('T')[0];
      this.end = this.selectedDateRange[1].toISOString().split('T')[0];
    }

    const urlRange = `${url}${this.start}&end=${this.end}`;
    if (this.coinName.split('-')[1] !== undefined) {
      this.coinName = this.coinName.split('-')[1];
    }
    this.coinPaprikaService.getData(urlRange).subscribe(
      (res) => {
        // adjusting the input data
        this.labelsGraphX = [];
        const highData = [];
        const lowData = [];

        // calc the average with FIAT rate
        this.dataAverageArrayGraph = res.map((obj, index) => {
          const average = (
            ((obj.high + obj.low) / 2) *
            this.selectRate
          ).toFixed(2);
          this.labelsGraphX.push(obj.time_open);
          highData.push(obj.high);
          lowData.push(obj.low);
          return average;
        });

        this.coinDataArray = [...this.dataAverageArrayGraph];
        this.show = true;
        this.plotGraph(
          this.dataAverageArrayGraph,
          lowData,
          highData,
          this.labelsGraphX
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

  replotGraph() {
    console.log(this.selectedDateRange);
  }

  plotGraph(data, lowData, highData, labels) {
    console.log(data);
    console.log(labels);
    let pointRadius = 2;
    if (screen.width >= 1900) {
      pointRadius = 7;
    }

    this.data = {
      labels,
      datasets: [
        {
          label: `${this.coinName}`,
          data,
          fill: false,
          borderColor: '#4bc0c0',
          pointRadius,
          pointHoverBorderColor: 'red',
          pointHoverRadius: 10,
          pointHoverBorderWidth: 7,
        },
        // {
        //   label: 'low peak values',
        //   data: lowData,
        //   fill: false,
        //   borderColor: '#dc3545',
        //   hidden: true,
        //   pointRadius: 1,
        // },
        // {
        //   label: 'high peak values',
        //   data: highData,
        //   fill: false,
        //   borderColor: '#007bff',
        //   hidden: true,
        //   pointRadius: 1,
        // },
      ],
    };
    let valueAverageAnnotation = 0;
    data.forEach((item) => {
      valueAverageAnnotation += parseFloat(item);
    });

    valueAverageAnnotation = valueAverageAnnotation / data.length;
    const optionsTemp = { ...this.options };
    optionsTemp.annotation.annotations[0].label.content = `${this.translateService.instant(
      'TRANSLATE.GRAPH_COIN.AVERAGE'
    )}: ${valueAverageAnnotation.toFixed(2)} ${this.selectedExchange}`;
    optionsTemp.annotation.annotations[0].value = valueAverageAnnotation;

    (optionsTemp.tooltips.callbacks.label = (tooltipItem, dataIn) => {
      const label = dataIn.datasets[tooltipItem.datasetIndex].label || '';
      return `${label}: ${tooltipItem.yLabel} ${this.selectedExchange}`;
    }),
      (optionsTemp.scales.yAxes[0].ticks.callback = (value) => {
        if (value > 10 ** 3 && value <= 10 ** 6) {
          return `${Math.round(value / 10 ** 3)} K ${
            hash[this.selectedExchange]
          }`;
        } else if (value > 10 ** 6 && value <= 10 ** 9) {
          return `${Math.round(value / 10 ** 6)} M ${
            hash[this.selectedExchange]
          }`;
        } else if (value > 10 ** 9 && value <= 10 ** 12) {
          return `${Math.round(value / 10 ** 9)} B ${
            hash[this.selectedExchange]
          }`;
        } else if (value > 10 ** 12 && value <= 10 ** 15) {
          return `${Math.round(value / 10 ** 9)} T ${
            hash[this.selectedExchange]
          }`;
        }
      })((this.options = optionsTemp));
  }
}
