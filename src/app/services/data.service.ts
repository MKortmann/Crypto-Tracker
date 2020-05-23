import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  coinLoreGlobalUrl: string = 'https://api.coinlore.net/api/global/';
  coinLoreUrl: string = 'https://api.coinlore.net/api/tickers/';
  constructor(private http: HttpClient) {}

  // global market values
  getGlobal() {
    return this.http
      .get<any>(`${this.coinLoreGlobalUrl}`)
      .toPromise()
      .then((res) => {
        return res;
      });
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
