import { Component, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ExchangeService } from '../../services/exchange.service';
import { SelectItem } from 'primeng/api';

import { Carousel } from 'primeng/carousel';

import { CoinPaprikaService } from '../../services/coin-paprika.service';

import { CoinLoreService } from '../../services/coinLore.service';

import { Coin } from '../../models/Coin';

@Component({
  selector: 'app-cryptos',
  templateUrl: './cryptos.component.html',
  styleUrls: ['./cryptos.component.scss'],
})
export class CryptosComponent implements OnInit {
  @Output() zoomGraph = false;
  public visible = true;
  label = '24h';
  selectedExchange: any = 'USD';
  selectRate = 1;
  exchanges: SelectItem[];
  symbol = 'BTC';
  listWatchCryptos = Array.from({ length: 100 }, (x) => false);
  activeTab = 0;
  coins: Coin[];
  selectedCoin = 1;

  constructor(
    private translate: TranslateService,
    private exchangeService: ExchangeService,
    private coinPaprikaService: CoinPaprikaService,
    private coinLoreService: CoinLoreService
  ) {
    // If we override the onTouchMove method, the scroll would start working.
    // Because in the plugin implementation of this method default event is prevented.
    Carousel.prototype.onTouchMove = () => {};
  }

  ngOnInit(): void {
    this.checkTheSelectedExchangeByTheUser();

    // localStorage
    this.checkTheSelectedCoinByTheUser();

    this.getTheWatchListByTheUser();

    this.subscribeForMoneyChange();

    this.generateCoinDropDownList();
  }
  private generateCoinDropDownList() {
    this.coinLoreService.getGlobalCryptoData(0, 100).subscribe(
      (res) => {
        this.coins = res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private subscribeForMoneyChange() {
    this.exchangeService.getMoney('USD').subscribe(
      (res) => {
        const array = Object.entries(res.rates);
        this.exchanges = array.map(([lat, lng]) => ({
          label: lat,
          value: lng,
        }));
      },
      (error) => console.log(error)
    );
  }

  selectCoin(event, dd) {
    // we are passing the coin clicked id in accord to coinPaprika
    const name = event.value.name;
    const symbol = event.value.symbol;
    const coinId = this.extractCoinIdName(symbol, name);
    this.coinPaprikaService.selectedCoinById(coinId);
  }

  private extractCoinIdName(symbol: any, name: any) {
    let coinID = `${symbol}-${name}`;
    coinID = coinID.replace(' ', '-').toLowerCase();

    if (coinID === 'bchsv-bitcoin-sv' || coinID === 'bch-bitcoincash') {
      coinID = 'bsv-bitcoin-sv';
    }
    return coinID;
  }

  getTheWatchListByTheUser() {
    if (localStorage.getItem('listWatchCryptos') !== null) {
      this.listWatchCryptos = JSON.parse(
        localStorage.getItem('listWatchCryptos')
      );
    }
  }

  // pTemplate ="content" is lazy load in html, but it does not solve the problem.
  // handleChange: important because the lazy load of p-table does not work properly.
  handleChange(e) {
    this.activeTab = e.index;

    if (e === 2 || e === 3) {
      const coinName = localStorage.getItem('coinName');
      this.coinPaprikaService.plotGraphWithCorrectCoinValue(coinName);
    }
  }

  private checkTheSelectedExchangeByTheUser() {
    if (localStorage.getItem('selectedExchange') !== null) {
      this.selectedExchange = localStorage.getItem('selectedExchange');
      this.selectRate = JSON.parse(localStorage.getItem('selectRate'));
    }
  }

  private checkTheSelectedCoinByTheUser() {
    if (localStorage.getItem('coinName') !== null) {
      this.symbol = localStorage
        .getItem('coinName')
        .split('-')[0]
        .toUpperCase();
    }
  }

  setWatchListStar(event) {
    this.listWatchCryptos[event] = !this.listWatchCryptos[event];
    localStorage.setItem(
      'listWatchCryptos',
      JSON.stringify(this.listWatchCryptos)
    );
  }

  // change the coin, so we fetch the data again!
  selection(event, dd) {
    this.selectedExchange = dd.selectedOption.label;
    this.selectRate = event.value;
    localStorage.setItem('selectedExchange', this.selectedExchange);
    localStorage.setItem('selectRate', JSON.stringify(this.selectRate));
    this.exchangeService.changeMoney(this.selectedExchange, this.selectRate);
  }
}
