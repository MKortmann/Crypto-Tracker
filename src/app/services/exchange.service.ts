import { Injectable, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  money: string;
  exchangeUrl = `http://api.exchangeratesapi.io/v1/latest?access_key=${environment.access_key}`;

  public onSelectedMoneyChange: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {}

  // get the exchange rates in accord to the passed base that can be e.g.: EUR, USD
  getMoney(base): Observable<any> {
    return this.http.get<any>(`${this.exchangeUrl}`);
  }

  changeMoney(money: string, selectRate: number) {
    this.money = money;
    this.onSelectedMoneyChange.emit([money, selectRate]);
  }
}
