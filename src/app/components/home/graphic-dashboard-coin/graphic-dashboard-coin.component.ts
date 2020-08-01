import { Component, OnInit } from '@angular/core';

import { CoinPaprikaService } from '../../../services/coin-paprika.service';

import 'chartjs-plugin-annotation';
// import * as ChartAnnotation from 'chartjs-plugin-annotation';

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
  options: any;
  selectedDateRange = null;
  startDate = new Date().toISOString().split('T')[0];
  start = this.startDate.split('-')[0] + '-01-01';
  end = new Date().toISOString().split('T')[0];
  placeholder: any;

  constructor(private coinPaprikaService: CoinPaprikaService) {}

  ngOnInit(): void {
    const placeholderStart = `${this.start.split('-')[2]}.${
      this.start.split('-')[1]
    }.${this.start.split('-')[0]}`;
    const placeholderEnd = `${this.end.split('-')[2]}.${
      this.end.split('-')[1]
    }.${this.end.split('-')[0]}`;
    this.placeholder = `${placeholderStart}-${placeholderEnd}`;

    this.options = {
      maintainAspectRatio: true,
      plugins: {
        annotation: {
          drawTime: 'beforeDatasetsDraw',
          annotations: [
            {
              id: 'a-line-1hline',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: 7000,
              borderColor: 'red',
              borderWidth: 10,
              label: {
                backgroundColor: 'red',
                content: 'Test Label',
                enabled: true,
              },
            },
          ],
        },
      },
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
            return `${label}: $${tooltipItem.yLabel}`;
          },
        },
      },
      legend: {
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
            ticks: {
              // Include a dollar sign in the ticks
              callback: (value, index, values) => {
                if (value > 1000) {
                  return '$' + value / 1000 + 'k';
                }
                return '$' + value;
              },
            },
          },
        ],
        xAxes: [
          {
            type: 'time',
            time: {
              unit: 'month',
            },
          },
        ],
      },
    };

    this.fetchDataToPlot();

    this.coinPaprikaService.onSelectedCoinChange.subscribe((url) => {
      this.fetchDataToPlot(url);
    });

    this.coinPaprikaService.onSelectCoinName.subscribe((name) => {
      const nameTemp = name.split('-');

      if (nameTemp[2] !== undefined) {
        this.coinName = `${nameTemp[1]} ${nameTemp[2]}`;
      } else {
        this.coinName = nameTemp[1];
      }
    });
  }

  fetchDataToPlot(
    url = `https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/historical?start=`
  ) {
    if (this.selectedDateRange !== null) {
      this.start = this.selectedDateRange[0].toISOString().split('T')[0];
      this.end = this.selectedDateRange[1].toISOString().split('T')[0];
    }

    const urlRange = `${url}${this.start}&end=${this.end}`;
    this.coinPaprikaService.getData(urlRange).subscribe((res) => {
      // adjusting the input data
      const labels = [];
      const highData = [];
      const lowData = [];
      const dataAverageArray = res.map((obj, index) => {
        const average = ((obj.high + obj.low) / 2).toFixed(2);
        labels.push(obj.time_open);
        highData.push(obj.high);
        lowData.push(obj.low);
        return average;
      });

      this.coinDataArray = [...dataAverageArray];
      this.show = true;
      this.plotGraph(dataAverageArray, lowData, highData, labels);
    });
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
        {
          label: 'low peak values',
          data: lowData,
          fill: false,
          borderColor: '#dc3545',
          hidden: true,
          pointRadius: 1,
        },
        {
          label: 'high peak values',
          data: highData,
          fill: false,
          borderColor: '#007bff',
          hidden: true,
          pointRadius: 1,
        },
      ],
    };
  }
}
