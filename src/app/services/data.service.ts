import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Coin {
  id;
  symbol;
  name;
  nameid;
  rank;
  price_usd;
  percent_change_24h;
  percent_change_1h;
  percent_change_7d;
  market_cap_usd;
  volume24;
  volume24_native;
  csupply;
  price_btc;
  tsupply;
  msupply;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getGlobalCryptoData() {
    return this.http
      .get<any>('https://api.coinlore.net/api/tickers/?start=100&limit=200')
      .toPromise()
      .then((res) => {
        return res;
      });
  }
}
