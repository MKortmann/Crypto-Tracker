import { Injectable, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  // exchangeUrl = 'https://api.exchangeratesapi.io/v1/';
  money: string;
  exchangeUrl =
    'http://api.exchangeratesapi.io/v1/latest?access_key=120b00ab3099aa8686cfbdc1cecb2eae';

  public onSelectedMoneyChange: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {}

  // get the exchange rates in accord to the passed base that can be e.g.: EUR, USD
  getMoney(base): Observable<any> {
    // return this.http.get<any>(
    //   `${this.exchangeUrl}latest?${this.access_key}&base=${base}`
    // );
    return this.http.get<any>(`${this.exchangeUrl}`);
  }

  changeMoney(money: string, selectRate: number) {
    this.money = money;
    this.onSelectedMoneyChange.emit([money, selectRate]);
  }
}
