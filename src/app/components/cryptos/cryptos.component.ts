import { Component, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ExchangeService } from '../../services/exchange.service';
import { SelectItem } from 'primeng/api';

import { Carousel } from 'primeng/carousel';

import { catchError } from 'rxjs/operators';

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
  toggleGraph = false;
  listWatchCryptos = Array.from({ length: 100 }, (x) => false);

  constructor(
    private translate: TranslateService,
    private exchangeService: ExchangeService
  ) {
    // If we override the onTouchMove method, the scroll would start working.
    // Because in the plugin implementation of this method default event is prevented.
    Carousel.prototype.onTouchMove = () => {};
  }

  ngOnInit(): void {
    this.checkTheShowHideGraphStateByTheUser();

    this.checkTheSelectedExchangeByTheUser();

    // localStorage
    this.checkTheSelectedCoinByTheUser();

    this.getTheWatchListByTheUser();

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
  getTheWatchListByTheUser() {
    if (localStorage.getItem('listWatchCryptos') !== null) {
      this.listWatchCryptos = JSON.parse(
        localStorage.getItem('listWatchCryptos')
      );
    }
  }

  private checkTheShowHideGraphStateByTheUser() {
    if (localStorage.getItem('toogleGraph') !== null) {
      this.toggleGraph = JSON.parse(localStorage.getItem('toogleGraph'));
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

  toggleShowHideGraph() {
    this.toggleGraph = !this.toggleGraph;
    localStorage.setItem('toogleGraph', JSON.stringify(this.toggleGraph));
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
