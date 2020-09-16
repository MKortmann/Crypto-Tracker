import { Component, OnInit } from '@angular/core';

import { CoinLoreService } from '../../services/coinLore.service';
import { ExchangeService } from '../../services/exchange.service';

import { TranslateService } from '@ngx-translate/core';

interface IntervalTimer {
  name: string;
  value: number;
}

@Component({
  selector: 'app-sub-nav',
  templateUrl: './sub-nav.component.html',
  styleUrls: ['./sub-nav.component.scss'],
})
export class SubNavComponent implements OnInit {
  constructor(
    private coinLoreService: CoinLoreService,
    private exchangeService: ExchangeService,
    private translateService: TranslateService
  ) {}

  intervals: IntervalTimer[];
  selectedInterval: IntervalTimer;

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
  public readonly MIN_5: number = 300000;
  public readonly MIN_10: number = 600000;
  public readonly MIN_30: number = 1800000;
  public readonly MIN_60: number = 3600000;

  public readonly Intervals = {
    SEC_30: 30000,
    MIN_1: 60000,
    MIN_5: 300000,
    MIN_10: 600000,
    MIN_30: 1800000,
    MIN_60: 3600000,
  };

  ngOnInit(): void {
    this.intervals = [
      { name: '30 sec', value: 30000 },
      { name: '1 min', value: 60000 },
      { name: '5 min', value: 300000 },
      { name: '10 min', value: 600000 },
      { name: '30 min', value: 1800000 },
      { name: '1 hour', value: 3600000 },
      { name: 'Stop Update', value: 0 },
    ];

    this.interval = JSON.parse(localStorage.getItem('interval'));
    if (this.interval !== 0) {
      if (this.interval === null) {
        this.interval = this.MIN_60;
        this.load(this.MIN_10);
      } else {
        this.load(this.interval);
      }
      this.decreaseTimeInterval();
    }
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
      case this.MIN_5:
        this.showSeconds = 59;
        this.showMinutes = 4;
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
    if (interval !== 0) {
      this.interval = interval;
      localStorage.setItem('interval', interval);
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
            });
          });
          this.coinLoreService.newData(this.data);
          this.reset();
        });
        console.log(this.interval);
      }, this.interval);
    } else {
      this.interval = 0;
      clearInterval(this.timeIntervalDecrease);
    }
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
