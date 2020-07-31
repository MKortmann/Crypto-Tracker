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

  constructor(private coinPaprikaService: CoinPaprikaService) {}

  ngOnInit(): void {
    this.coinPaprikaService.onSelectedCoinChange.subscribe((url) => {
      this.coinPaprikaService.getData(url).subscribe((res) => {
        // adjusting the input data
        let singleArray = res.map((obj) => {
          const average = ((obj.high + obj.low) / 2).toFixed(2);
          return [obj.time_open, average];
        });
        this.coinDataArray = [...singleArray];
        console.log(this.coinDataArray);
      });
    });
    this.plotGraph();
  }

  plotGraph() {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#4bc0c0',
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#565656',
        },
      ],
    };
  }
}
