import { Component, OnInit } from '@angular/core';

import { CoinLoreService } from '../../../services/coinLore.service';

import { Coin } from '../../../models/Coin';

import { ExchangeService } from '../../../services/exchange.service';

import { TranslateService } from '@ngx-translate/core';

import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  coins: Coin[];
  exchanges: SelectItem[];
  selectedExchange: any = 'EUR';
  selectRate: number;
  selectRateEUR: number;

  constructor(
    private coinLoreService: CoinLoreService,
    private translate: TranslateService,
    private exchangeService: ExchangeService
  ) {}

  ngOnInit(): void {
    // get the cryptocurrencies passing the rank number and the limit...
    this.coinLoreService.getGlobalCryptoData(0, 100).then((res) => {
      this.coins = res.data;
    });

    this.exchangeService.getMoney('USD').then((res) => {
      this.selectRateEUR = res.rates[`EUR`];
      const array = Object.entries(res.rates);
      // doing an array of objects along with the optionLabel property to specify the field name of the option.
      this.exchanges = array.map(([lat, lng]) => ({
        label: lat,
        value: lng,
      }));

      this.selectedExchange = 'CAD';
      this.selectRate = this.exchanges[0].value;
    });
  }

  selection(event, dd) {
    this.selectedExchange = dd.selectedOption.label;
    console.log(dd.selectedOption.label);
    this.selectRate = event.value;
  }
}
