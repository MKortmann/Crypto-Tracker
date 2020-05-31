import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  exchangeUrl = 'https://api.exchangeratesapi.io/';
  money: any;

  constructor(private http: HttpClient) {}

  // get the exchange rates in accord to the passed base that can be e.g.: EUR, USD
  getMoney(base): Observable<any> {
    return this.http.get<any>(`${this.exchangeUrl}latest?base=${base}`);
    // .toPromise()
    // .then((res) => {
    //   return res;
    // });
  }
}
