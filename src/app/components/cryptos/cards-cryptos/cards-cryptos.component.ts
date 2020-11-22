import { Component, OnInit, Input } from '@angular/core';

import { CoinLoreService } from '../../../services/coinLore.service';

import { ExchangeService } from '../../../services/exchange.service';

import { CoinPaprikaService } from '../../../services/coin-paprika.service';

import { GLOBAL_VARIABLES } from '../../../globals/global-constants';

@Component({
  selector: 'app-cards-cryptos',
  templateUrl: './cards-cryptos.component.html',
  styleUrls: ['./cards-cryptos.component.scss'],
})
export class CardsCryptosComponent implements OnInit {
  private readonly PRICE_EUR = `price_eur`;
  private readonly BSV = 'BSV';
  private readonly BCHSV = 'BCHSV';

  data: any;

  @Input() symbol;
  rateConvertEUR: number;
  timer = null;
  private readonly TOTAL_NUMBER_OF_CARDS =
    GLOBAL_VARIABLES.TOTAL_NUMBER_OF_CARDS;

  constructor(
    private coinLoreService: CoinLoreService,
    private exchangeService: ExchangeService,
    private coinPaprikaService: CoinPaprikaService
  ) {}

  ngOnInit(): void {
    // filling with values
    this.coinLoreService
      .getGlobalCryptoData(0, this.TOTAL_NUMBER_OF_CARDS)
      .subscribe((res) => {
        this.data = [...res.data];
        this.getTheLowHighPriceValues();
      });

    this.exchangeService.getMoney(GLOBAL_VARIABLES.USD).subscribe((res2) => {
      (this.rateConvertEUR = res2.rates[GLOBAL_VARIABLES.EUR]),
        this.data.forEach((item) => {
          item[this.PRICE_EUR] =
            item.price_usd * res2.rates[GLOBAL_VARIABLES.EUR];
        });
    });

    // subscribe for a service that update data
    this.coinLoreService.cast.subscribe((data) => {
      this.data = [...data];
      this.getTheLowHighPriceValues();
    });

    this.coinPaprikaService.onSelectedCoinChange.subscribe((coin) => {
      this.symbol = this.extractSymbolName(coin);
    });
  }

  private extractSymbolName(coin: any): string {
    let symbol = coin.split('-')[0].toUpperCase();
    if (symbol === this.BSV) {
      symbol = this.BCHSV;
    }
    return symbol;
  }

  getTheLowHighPriceValues() {
    if (this.timer !== null) {
      clearTimeout(this.timer);
    }

    this.data.forEach((item, index) => {
      let fullName = this.extractFullName(item);
      fullName = this.checkIfTheNameNeedToBeRenamed(item, fullName);
      item[`price_eur`] = item.price_usd * this.rateConvertEUR;

      this.coinPaprikaService.getOHLCFullDayToday(fullName).subscribe((res) => {
        item[`high_usd`] = res[0].high.toFixed(2);
        item[`low_usd`] = res[0].low.toFixed(2);
        item[`high_eur`] = res[0].high.toFixed(2) * this.rateConvertEUR;
        item[`low_eur`] = res[0].low.toFixed(2) * this.rateConvertEUR;
      });
    });
  }

  private checkIfTheNameNeedToBeRenamed(item: any, fullName: string) {
    if (item.symbol === 'BCH') {
      fullName = 'bch-bitcoin-cash';
    }
    if (item.symbol === 'BCHSV') {
      fullName = 'bsv-bitcoin-sv';
    }
    return fullName;
  }

  private extractFullName(item: any): string {
    return item.symbol.toLowerCase() + '-' + item.nameid;
  }

  selectedCoin(name, symbol) {
    const coinId = this.extractCoinIdName(symbol, name);
    this.coinPaprikaService.selectedCoinById(coinId);
    localStorage.setItem('coinName', coinId);
  }

  private extractCoinIdName(symbol: any, name: any) {
    let coinID = `${symbol}-${name}`;
    coinID = coinID.replace(' ', '-').toLowerCase();
    if (coinID === 'bchsv-bitcoin-sv') {
      coinID = 'bsv-bitcoin-sv';
    }
    return coinID;
  }
}
