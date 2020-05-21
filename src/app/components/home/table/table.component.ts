import { Component, OnInit } from '@angular/core';

import { DataService, Coin } from '../../../services/data.service';

import { ExchangeService } from '../../../services/exchange.service';

import { TranslateService } from '@ngx-translate/core';

import { SelectItem } from 'primeng/api';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  coins: Coin[];
  exchanges: SelectItem[];
  selectRate: number = 1.09;
  name: any;

  cities: any[];
  selectedCity: any;

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
      let array = Object.entries(res.rates);
      this.exchanges = array.map(([lat, lng]) => ({ label: lat, value: lng }));
      // this.exchanges = obj;
    });

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }

  selection(event) {
    console.log(this.name);

    this.selectRate = event.value;
  }
}
