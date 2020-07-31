import { Component, OnInit } from '@angular/core';

import { CoinLoreService } from '../../../services/coinLore.service';

import { ExchangeService } from '../../../services/exchange.service';

import { CoinPaprikaService } from '../../../services/coin-paprika.service';
import { iif } from 'rxjs';

@Component({
  selector: 'app-card-dashboard',
  templateUrl: './card-dashboard.component.html',
  styleUrls: ['./card-dashboard.component.scss'],
})
export class CardDashboardComponent implements OnInit {
  data: any;

  constructor(
    private coinLoreService: CoinLoreService,
    private exchangeService: ExchangeService,
    private coinPaprikaService: CoinPaprikaService
  ) {}

  ngOnInit(): void {
    // filling with values
    this.coinLoreService.getGlobalCryptoData(0, 12).subscribe((res) => {
      this.data = [...res.data];

      this.exchangeService.getMoney('USD').subscribe((res2) => {
        this.data.forEach((item) => {
          item[`price_eur`] = item.price_usd * res2.rates[`EUR`];
        });
      });
    });

    // subscribe for a service that update data
    this.coinLoreService.cast.subscribe((data) => {
      this.data = [...data];
      this.exchangeService.getMoney('USD').subscribe((res2) => {
        this.data.forEach((item) => {
          item[`price_eur`] = item.price_usd * res2.rates[`EUR`];
        });
      });
    });
  }

  selectedCoin(name, symbol) {
    // we are passing the coin clicked id in accord to coinPaprika
    let clicked = `${symbol}-${name}`;
    clicked = clicked.replace(' ', '-').toLowerCase();

    if (clicked === 'bchsv-bitcoin-sv') {
      clicked = 'bsv-bitcoin-sv';
    }
    this.coinPaprikaService.selectedCoinById(clicked);
  }
}
