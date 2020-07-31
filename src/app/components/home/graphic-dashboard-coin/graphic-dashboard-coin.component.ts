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
  coinName: string;
  show = false;

  constructor(private coinPaprikaService: CoinPaprikaService) {}

  ngOnInit(): void {
    this.coinPaprikaService.onSelectedCoinChange.subscribe((url) => {
      this.coinPaprikaService.getData(url).subscribe((res) => {
        // adjusting the input data
        let numbers = [];
        let dataAverageArray = res.map((obj, index) => {
          const average = ((obj.high + obj.low) / 2).toFixed(2);
          numbers.push(++index);
          return average;
        });
        this.coinDataArray = [...dataAverageArray];
        this.plotGraph(dataAverageArray, numbers);
      });
    });
    this.coinPaprikaService.onSelectCoinName.subscribe((name) => {
      this.show = true;
      this.coinName = name;
    });
  }

  plotGraph(data, labels) {
    console.log(data);
    console.log(labels);
    this.data = {
      labels: labels,
      datasets: [
        {
          label: 'First Dataset',
          data: data,
          fill: false,
          borderColor: '#4bc0c0',
        },
      ],
    };
  }
}
