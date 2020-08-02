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
  show = false;

  constructor(
    private coinLoreService: CoinLoreService,
    private exchangeService: ExchangeService,
    private coinPaprikaService: CoinPaprikaService
  ) {}

  ngOnInit(): void {
    if (screen.width < 1400) {
      this.show = true;
    }
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
    let coinID = `${symbol}-${name}`;
    coinID = coinID.replace(' ', '-').toLowerCase();

    if (coinID === 'bchsv-bitcoin-sv') {
      coinID = 'bsv-bitcoin-sv';
    }
    this.coinPaprikaService.selectedCoinById(coinID);
  }
}
