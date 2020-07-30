import { Component, OnInit } from '@angular/core';

import { CoinLoreService } from '../../services/coinLore.service';
import { ExchangeService } from '../../services/exchange.service';

@Component({
  selector: 'app-sub-nav',
  templateUrl: './sub-nav.component.html',
  styleUrls: ['./sub-nav.component.scss'],
})
export class SubNavComponent implements OnInit {
  constructor(
    private coinLoreService: CoinLoreService,
    private exchangeService: ExchangeService
  ) {}

  data: any;
  seconds: number;
  minutes: number;
  showSeconds: number;
  showMinutes: number;
  interval: number;
  timeInterval;
  timeIntervalDecrease;

  ngOnInit(): void {
    this.coinLoreService.cast.subscribe((data) => {
      console.log(data);
      this.data = data;
    });
    this.load(30000);
    this.interval = 30000;
    this.decreaseTimeInterval();
  }

  // decreate the count seconds and time in accord to interval
  decreaseTimeInterval() {
    this.reset();

    if (this.timeIntervalDecrease) {
      clearInterval(this.timeIntervalDecrease);
    }
    this.timeIntervalDecrease = setInterval(() => {
      --this.showSeconds;
      if (this.showSeconds === 0 && this.showMinutes !== 0) {
        this.showSeconds = 59;
        --this.showMinutes;
      }
    }, 1000);
  }

  // reset the show seconds and minutes in accord to interval
  reset() {
    switch (this.interval) {
      case 30000:
        this.showSeconds = 30;
        this.showMinutes = 0;
        break;
      case 60000:
        this.showSeconds = 59;
        this.showMinutes = 0;
        break;
      case 600000:
        this.showSeconds = 59;
        this.showMinutes = 9;
        break;
      case 1800000:
        this.showSeconds = 59;
        this.showMinutes = 29;
        break;
      case 3600000:
        this.showSeconds = 59;
        this.showMinutes = 59;
        break;
    }
  }

  load(interval) {
    this.interval = interval;
    this.reset();

    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }

    this.timeInterval = setInterval(() => {
      this.coinLoreService.getGlobalCryptoData(0, 12).subscribe((res) => {
        this.data = [...res.data];

        this.exchangeService.getMoney('USD').subscribe((res2) => {
          this.data.forEach((item) => {
            item[`price_eur`] = item.price_usd * res2.rates[`EUR`];

            this.coinLoreService.newData(this.data);
            console.log(this.data);
            this.reset();
          });
        });
      });
    }, interval);
  }
}
