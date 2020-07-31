import { Component, OnInit } from '@angular/core';

import { CoinLoreService } from '../../../services/coinLore.service';

import { Coin } from '../../../models/Coin';

import { ExchangeService } from '../../../services/exchange.service';

import { TranslateService } from '@ngx-translate/core';

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

  constructor(
    private coinLoreService: CoinLoreService,
    private translate: TranslateService,
    private exchangeService: ExchangeService
  ) {}

  ngOnInit(): void {
    // get the cryptocurrencies passing the rank number and the limit...
    // the cast here is working just as a trigger
    this.coinLoreService.cast.subscribe((data) => {
      this.loadTable();
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
            this.selectedExchange = 'CAD';
            this.selectRate = this.exchanges[0].value;
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

  selection(event, dd) {
    this.selectedExchange = dd.selectedOption.label;
    console.log(dd.selectedOption.label);
    this.selectRate = event.value;
  }
}
