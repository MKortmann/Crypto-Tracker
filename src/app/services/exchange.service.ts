import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  money: any;

  constructor(private http: HttpClient) {}

  // get the exchange rates in accord to EUR
  getMoney() {
    return this.http
      .get<any>('https://api.exchangeratesapi.io/latest?base=USD')
      .toPromise()
      .then((res) => {
        return res;
      });
  }
}
