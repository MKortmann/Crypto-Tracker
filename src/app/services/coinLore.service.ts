import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoinLoreService {
  globalValuesFromCoinLore: Observable<any>;
  coinsValuesFromCoinLore: any;

  coinLoreGlobalUrl = 'https://api.coinlore.net/api/global/';
  coinLoreUrl = 'https://api.coinlore.net/api/tickers/';
  constructor(private http: HttpClient) {}

  // global market values
  getGlobal() {
    return this.http
      .get<any>(`${this.coinLoreGlobalUrl}`)
      .toPromise()
      .then((res) => {
        this.coinLoreGlobalUrl = res;
        return res;
      });
  }

  getData() {
    this.globalValuesFromCoinLore = new Observable((observer) => {
      setTimeout(() => {
        observer.next(1);
      }, 1000);
      setTimeout(() => {
        observer.next(2);
      }, 2000);
      setTimeout(() => {
        observer.next(3);
      }, 3000);
      setTimeout(() => {
        observer.next(4);
      }, 4000);
    });
    return this.globalValuesFromCoinLore;
  }

  // start and limit value
  getGlobalCryptoData(start, limit) {
    return this.http
      .get<any>(`${this.coinLoreUrl}?start=${start}&limit=${limit}`)
      .toPromise()
      .then((res) => {
        return res;
      });
  }
}
