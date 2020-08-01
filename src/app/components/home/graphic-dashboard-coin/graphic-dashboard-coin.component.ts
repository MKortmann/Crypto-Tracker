import { Component, OnInit } from '@angular/core';

import { CoinPaprikaService } from '../../../services/coin-paprika.service';

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

  constructor(private coinPaprikaService: CoinPaprikaService) {}

  ngOnInit(): void {
    this.options = {
      tooltips: {
        titleFontSize: 18,
        bodyFontSize: 16,
        // backgroundColor: '#4bc0c0',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || '';
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
        onHover: function (e) {
          const point = this.getElementAtEvent(e);
          if (point.length) e.target.style.cursor = 'pointer';
          else e.target.style.cursor = 'default';
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

    this.coinPaprikaService.onSelectedCoinChange.subscribe((url) => {
      this.coinPaprikaService.getData(url).subscribe((res) => {
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
