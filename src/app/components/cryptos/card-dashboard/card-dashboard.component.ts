import { Component, OnInit, Input } from '@angular/core';

import { CoinLoreService } from '../../../services/coinLore.service';

import { ExchangeService } from '../../../services/exchange.service';

import { CoinPaprikaService } from '../../../services/coin-paprika.service';

@Component({
  selector: 'app-card-dashboard',
  templateUrl: './card-dashboard.component.html',
  styleUrls: ['./card-dashboard.component.scss'],
})
export class CardDashboardComponent implements OnInit {
  data: any;
  classes = {};
  @Input() symbol;
  rateConvertEUR = 0;
  timer = null;

  constructor(
    private coinLoreService: CoinLoreService,
    private exchangeService: ExchangeService,
    private coinPaprikaService: CoinPaprikaService
  ) {}

  ngOnInit(): void {
    // filling with values
    this.coinLoreService.getGlobalCryptoData(0, 12).subscribe((res) => {
      this.data = [...res.data];
      this.lowHighFetch();
    });

    this.exchangeService.getMoney('USD').subscribe((res2) => {
      (this.rateConvertEUR = res2.rates[`EUR`]),
        this.data.forEach((item) => {
          item[`price_eur`] = item.price_usd * res2.rates[`EUR`];
        });
    });

    // subscribe for a service that update data
    this.coinLoreService.cast.subscribe((data) => {
      this.data = [...data];
      this.lowHighFetch();
    });

    this.coinPaprikaService.onSelectedCoinChange.subscribe((coin) => {
      this.symbol = coin.split('-')[0].toUpperCase();
      // we will have to find a better way to fix it
      if (this.symbol === 'BSV') {
        this.symbol = 'BCHSV';
      }
    });
  }

  lowHighFetch() {
    if (this.timer !== null) {
      clearTimeout(this.timer);
    }

    this.data.forEach((item, index) => {
      let fullName = item.symbol.toLowerCase() + '-' + item.nameid;
      if (item.symbol === 'BCH') {
        fullName = 'bch-bitcoin-cash';
      }
      if (item.symbol === 'BCHSV') {
        fullName = 'bsv-bitcoin-sv';
      }
      item[`price_eur`] = item.price_usd * this.rateConvertEUR;

      if (index < 10) {
        this.coinPaprikaService
          .getOHLCFullDayToday(fullName)
          .subscribe((res) => {
            item[`high_usd`] = res[0].high.toFixed(2);
            item[`low_usd`] = res[0].low.toFixed(2);
            item[`high_eur`] = res[0].high.toFixed(2) * this.rateConvertEUR;
            item[`low_eur`] = res[0].low.toFixed(2) * this.rateConvertEUR;
          });
      } else {
        // necessary because of API fetch limitation!!
        this.timer = setTimeout(() => {
          this.coinPaprikaService.getOHLCFullDayToday(fullName).subscribe(
            (res) => {
              item[`high_usd`] = res[0].high.toFixed(2);
              item[`low_usd`] = res[0].low.toFixed(2);
              item[`high_eur`] = res[0].high.toFixed(2) * this.rateConvertEUR;
              item[`low_eur`] = res[0].low.toFixed(2) * this.rateConvertEUR;
            },
            (error) => {
              console.log('Error at getOHLCFullDay', error);
            }
          );
        }, 2000);
      }
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
    localStorage.setItem('coinName', coinID);
  }
}
