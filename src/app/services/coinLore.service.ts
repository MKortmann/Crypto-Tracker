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
  constructor(private http: HttpClient) {
    this.getGlobal();
  }

  // global market values
  getGlobal(): Observable<any> {
    return this.http.get<any>(`${this.coinLoreGlobalUrl}`);
    // .toPromise()
    // .then((res) => {
    //   this.globalValuesFromCoinLore = res;
    //   return res;
    // });
  }

  getData(): Observable<any> {
    console.log('Is there any data?', this.globalValuesFromCoinLore);
    return of(this.globalValuesFromCoinLore);
  }

  // start and limit value
  getGlobalCryptoData(start, limit): Observable<any> {
    return this.http.get<any>(
      `${this.coinLoreUrl}?start=${start}&limit=${limit}`
    );
  }
}
