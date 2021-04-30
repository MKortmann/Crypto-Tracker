import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Coin } from '../../../models/Coin';

import { TranslateService } from '@ngx-translate/core';
import { ExchangeService } from '../../../services/exchange.service';
import { CoinPaprikaService } from '../../../services/coin-paprika.service';
import { CoinLoreService } from '../../../services/coinLore.service';

import { SelectItem } from 'primeng/api';

import { GLOBAL_VARIABLES } from '../../../globals/global-constants';

interface OptionDropDown {
  name: string;
  value: number;
}

@Component({
  selector: 'app-table-cryptos',
  templateUrl: './table-cryptos.component.html',
  styleUrls: ['./table-cryptos.component.scss'],
})
export class TableCryptosComponent implements OnInit {
  coins: Coin[];
  exchanges: SelectItem[];
  selectedExchange: any = GLOBAL_VARIABLES.EUR;
  selectRate: number;
  selectRateEUR: any;
  @Input() symbol;
  @Input() atWatchList;
  @Input() listWatchCryptos;

  @Output() clickedWatchListStart = new EventEmitter<number>();

  optionsDropDown: SelectItem[];
  selectedDropDownOption: OptionDropDown;
  selected = 2;
  selectedName = '1h';

  customIcon = 'swap_vert';

  constructor(
    private coinLoreService: CoinLoreService,
    private translate: TranslateService,
    private exchangeService: ExchangeService,
    private coinPaprikaService: CoinPaprikaService
  ) {}

  ngOnInit(): void {
    debugger;
    this.optionsDropDown = [
      {
        label: 'Pr. BTC',
        icon: 'attach_money',
        value: 1,
      },
      {
        label: '1h',
        icon: 'swap_vert',
        value: 2,
      },
      {
        label: '24h',
        icon: 'swap_vert',
        value: 3,
      },
      {
        label: '7d',
        icon: 'swap_vert',
        value: 4,
      },
      {
        label: 'Mkt. Cap',
        icon: 'attach_money',
        value: 5,
      },
      {
        label: 'Vol. 24h',
        icon: 'attach_money',
        value: 6,
      },
    ];

    // get the cryptocurrencies passing the rank number and the limit...
    // the cast here is working just as a trigger
    this.coinLoreService.cast.subscribe((data) => {
      this.loadTable();
    });

    this.coinPaprikaService.onSelectedCoinChange.subscribe((coin) => {
      this.symbol = this.extractSymbolName(coin);
    });
  }

  toggleWatchList(event) {
    this.clickedWatchListStart.emit(event);
  }

  private extractSymbolName(coin: any): string {
    let symbol = coin.split('-')[0].toUpperCase();
    if (symbol === 'BSV') {
      symbol = 'BCH';
    }
    return symbol;
  }

  loadTable() {
    // here we have to load the 100 data again
    this.coinLoreService.getGlobalCryptoData(0, 100).subscribe(
      (res) => {
        debugger;
        this.coins = res.data;
        this.exchangeService.getMoney('USD').subscribe(
          (res2) => {
            debugger;
            const array = Object.entries(res2.rates);
            // doing an array of objects along with the optionLabel property to specify the field name of the option.
            this.exchanges = array.map(([lat, lng]) => ({
              label: lat,
              value: lng,
            }));
            this.selectRateEUR = 1 / res2.rates[GLOBAL_VARIABLES.USD];
            this.selectedExchange = localStorage.getItem(
              'selectedExchangeTable'
            );
            if (this.selectedExchange !== null) {
              this.selectRate = res2.rates[this.selectedExchange];
            } else {
              this.selectRate = this.exchanges[0].value;
            }
            this.selectRate *= this.selectRateEUR;
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
    const name = event.currentTarget.innerText.replace(' ', '');
    const symbol = event.currentTarget.firstElementChild.alt;
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

  selection(event, dd) {
    this.selectedExchange = dd.selectedOption.label;
    // correction, API send values in EUR now
    this.selectRate = event.value * this.selectRateEUR;
    localStorage.setItem('selectedExchangeTable', this.selectedExchange);
  }

  selectionDropDownTH(event, ff) {
    this.selected = event.value;
  }
}
