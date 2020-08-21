import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ExchangeService } from '../../services/exchange.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-cryptos',
  templateUrl: './cryptos.component.html',
  styleUrls: ['./cryptos.component.scss'],
})
export class CryptosComponent implements OnInit {
  public visible = true;
  label = '24h';
  selectedExchange: any = 'USD';
  selectRate = 1;
  exchanges: SelectItem[];
  symbol = 'BTC';

  constructor(
    private translate: TranslateService,
    private exchangeService: ExchangeService
  ) {}

  ngOnInit(): void {
    if (
      localStorage.getItem('selectedExchange') !== null &&
      localStorage.getItem('selectedExchange') !== undefined
    ) {
      this.selectedExchange = localStorage.getItem('selectedExchange');
      this.selectRate = JSON.parse(localStorage.getItem('selectRate'));
    } else {
      this.selectedExchange = 'USD';
      this.selectRate = 1;
    }

    // localStorage
    if (localStorage.getItem('coinName') !== null) {
      this.symbol = localStorage
        .getItem('coinName')
        .split('-')[0]
        .toUpperCase();
    }

    this.exchangeService.getMoney('USD').subscribe(
      (res) => {
        const array = Object.entries(res.rates);
        this.exchanges = array.map(([lat, lng]) => ({
          label: lat,
          value: lng,
        }));
        // checkLocalStorage
        // if (this.selectedExchange !== null) {
        //   this.selectRate = JSON.parse(localStorage.getItem('selectRate'));
        // }
      },
      (error) => console.log(error)
    );
  }

  switchGraphs() {
    this.visible = !this.visible;
    if (this.label === '24h') {
      this.label = '1year';
    } else {
      this.label = '24h';
    }
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
