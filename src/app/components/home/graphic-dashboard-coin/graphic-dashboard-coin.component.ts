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
      scales: {
        yAxes: [
          {
            ticks: {
              // Include a dollar sign in the ticks
              callback: (value, index, values) => {
                return '$' + value;
              },
            },
          },
        ],
      },
    };

    this.coinPaprikaService.onSelectedCoinChange.subscribe((url) => {
      this.coinPaprikaService.getData(url).subscribe((res) => {
        // adjusting the input data
        const numbers = [];
        const dataAverageArray = res.map((obj, index) => {
          const average = ((obj.high + obj.low) / 2).toFixed(2);
          numbers.push(++index);
          return average;
        });
        this.coinDataArray = [...dataAverageArray];
        this.show = true;
        this.plotGraph(dataAverageArray, numbers);
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

  plotGraph(data, labels) {
    console.log(data);
    console.log(labels);
    this.data = {
      labels,
      datasets: [
        {
          label: this.coinName,
          data,
          fill: false,
          borderColor: '#4bc0c0',
        },
      ],
    };
  }
}
