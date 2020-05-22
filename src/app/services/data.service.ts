import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  coinLoreUrl: string = 'https://api.coinlore.net/api/tickers/';
  constructor(private http: HttpClient) {}

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
