import { Component, OnInit } from '@angular/core';

import { Coin } from '../../../models/Coin';

import { TranslateService } from '@ngx-translate/core';
import { ExchangeService } from '../../../services/exchange.service';
import { CoinPaprikaService } from '../../../services/coin-paprika.service';
import { CoinLoreService } from '../../../services/coinLore.service';

import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  coins: Coin[];
  exchanges: SelectItem[];
  selectedExchange: any = 'EUR';
  selectRate: number;
  selectRateEUR: any;
  symbol = 'BTC';

  constructor(
    private coinLoreService: CoinLoreService,
    private translate: TranslateService,
    private exchangeService: ExchangeService,
    private coinPaprikaService: CoinPaprikaService
  ) {}

  ngOnInit(): void {
    // get the cryptocurrencies passing the rank number and the limit...
    // the cast here is working just as a trigger
    this.coinLoreService.cast.subscribe((data) => {
      this.loadTable();
    });

    this.coinPaprikaService.onSelectedCoinChange.subscribe((coin) => {
      this.symbol = coin.split('-')[0].toUpperCase();
      // we will have to find a better way to fix it
      if (this.symbol === 'BSV') {
        this.symbol = 'BCHSV';
      }
      console.log(this.symbol);
    });
  }

  loadTable() {
    this.coinLoreService.getGlobalCryptoData(0, 100).subscribe(
      (res) => {
        this.coins = res.data;

        this.exchangeService.getMoney('USD').subscribe(
          (res2) => {
            const array = Object.entries(res2.rates);
            // doing an array of objects along with the optionLabel property to specify the field name of the option.
            this.exchanges = array.map(([lat, lng]) => ({
              label: lat,
              value: lng,
            }));
            this.selectRateEUR = res2.rates[`EUR`];
            this.selectedExchange = localStorage.getItem(
              'selectedExchangeTable'
            );
            if (this.selectedExchange !== null) {
              this.selectRate = res2.rates[this.selectedExchange];
            } else {
              this.selectRate = this.exchanges[0].value;
            }
          },
          (error2) => {
            console.log(error2);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectedCoin(event) {
    // we are passing the coin clicked id in accord to coinPaprika
    const name = event.target.parentNode.cells[2].innerText;
    const symbol = event.target.parentElement.cells[1].firstElementChild.alt;
    let coinID = `${symbol}-${name}`;
    coinID = coinID.replace(' ', '-').toLowerCase();

    if (coinID === 'bchsv-bitcoin-sv') {
      coinID = 'bsv-bitcoin-sv';
    }
    this.coinPaprikaService.selectedCoinById(coinID);
  }

  selection(event, dd) {
    this.selectedExchange = dd.selectedOption.label;
    console.log(dd.selectedOption.label);
    this.selectRate = event.value;
    localStorage.setItem('selectedExchangeTable', this.selectedExchange);
  }
}
