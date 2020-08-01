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

  public readonly SEC_30: number = 30000;
  public readonly MIN_1: number = 60000;
  public readonly MIN_10: number = 600000;
  public readonly MIN_30: number = 1800000;
  public readonly MIN_60: number = 3600000;

  ngOnInit(): void {
    // this.coinLoreService.cast.subscribe((data) => {
    //   this.data = data;
    // });
    this.load(this.MIN_10);
    this.interval = this.MIN_10;
    this.decreaseTimeInterval();
  }

  // decreate the count seconds and time in accord to interval
  private decreaseTimeInterval() {
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
  private reset() {
    switch (this.interval) {
      case this.SEC_30:
        this.showSeconds = 30;
        this.showMinutes = 0;
        break;
      case this.MIN_1:
        this.showSeconds = 59;
        this.showMinutes = 0;
        break;
      case this.MIN_10:
        this.showSeconds = 59;
        this.showMinutes = 9;
        break;
      case this.MIN_30:
        this.showSeconds = 59;
        this.showMinutes = 29;
        break;
      case this.MIN_60:
        this.showSeconds = 59;
        this.showMinutes = 59;
        break;
    }
  }

  load(interval) {
    this.interval = interval;
    this.reset();
    this.decreaseTimeInterval();

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
            this.reset();
          });
        });
      });
    }, interval);
  }

  stop() {
    this.timeInterval = this.timeInterval
      ? clearInterval(this.timeInterval)
      : '';
    this.timeIntervalDecrease = this.timeIntervalDecrease
      ? clearInterval(this.timeIntervalDecrease)
      : '';
    this.interval = 0;
  }
}
