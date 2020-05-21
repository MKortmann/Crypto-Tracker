import { Component, OnInit } from '@angular/core';

import { DataService, Coin } from '../../../services/data.service';

import { ExchangeService } from '../../../services/exchange.service';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  coins: Coin[];
  factor: number = 1.09;
  rates: any;

  constructor(
    private dataService: DataService,
    private translate: TranslateService,
    private exchangeService: ExchangeService
  ) {}

  ngOnInit(): void {
    this.dataService.getGlobalCryptoData().then((res) => {
      this.coins = res.data;
      console.log(this.coins);
    });

    this.exchangeService.getMoney().then((res) => {
      this.rates = res.rates;
      console.log(this.rates);
    });
  }

  filterGlobal() {
    console.log('hello');
  }
}
