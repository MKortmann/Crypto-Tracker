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
  factor: number = 1.09;
  exchanges: SelectItem[];
  selectRate: any;

  cities1: SelectItem[];
  selectedCity1: City;

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

    this.cities1 = [
      { label: 'Select City', value: null },
      { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
      { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
      { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
      { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
      { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } },
    ];
  }

  filterGlobal() {
    console.log('hello');
  }

  // selection(event) {
  //   console.log(event);
  // }
}
