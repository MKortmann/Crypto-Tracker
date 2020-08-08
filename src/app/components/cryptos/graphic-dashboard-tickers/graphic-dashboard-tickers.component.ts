import { Component, OnInit } from '@angular/core';

import { CoinPaprikaService } from '../../../services/coin-paprika.service';

@Component({
  selector: 'app-graphic-dashboard-tickers',
  templateUrl: './graphic-dashboard-tickers.component.html',
  styleUrls: ['./graphic-dashboard-tickers.component.scss'],
})
export class GraphicDashboardTickersComponent implements OnInit {
  constructor(private coinPaprikaService: CoinPaprikaService) {}

  ngOnInit(): void {
    this.coinPaprikaService.onSelectedCoinChange.subscribe(() => {
      console.log('coin changed!');
    });
  }
}
