import { Injectable, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoinPaprikaService {
  public onSelectedCoinChange: EventEmitter<any> = new EventEmitter();

  private readonly getListOfCoins = 'https://api.coinpaprika.com/v1/coins/';

  private readonly getSingleCoin =
    'https://api.coinpaprika.com/v1/coins/btc-bitcoin';

  private readonly getExchangeForCoin =
    'https://api.coinpaprika.com/v1/coins/btc-bitcoin/markets';

  private readonly getOHLCFullDayLatest =
    'https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/latest';

  private readonly getOHLCFullDayToday =
    'https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/today';

  private readonly getHistoricalStartEnd =
    'https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/historical?start=2019-01-01&end=2019-01-20';

  // tickers: show percentage change: 15m, 30m, 1h, 6h, 12h, 24h, 7d, 30d, 1y
  private readonly getCoinTickers = 'https://api.coinpaprika.com/v1/tickers/';
  // private readonly getCoinTickers =
  // 'https://api.coinpaprika.com/v1/tickers/btc-bitcoin/historical?start=2019-01-01&end=2019-01-20';

  /*btc: btc-bitcoin*/

  constructor(private http: HttpClient) {}

  public selectedCoinByTickers(coin, start, end) {
    const url = `${this.getCoinTickers}${coin}/historical?start=${start}&end=${end}`;
  }

  public selectedCoinById(value: any) {
    this.onSelectedCoinChange.emit(value);
  }

  getData(url): Observable<any> {
    return this.http.get<any>(url);
  }

  // here the url1 it the data for the actual year
  // the url2 is one year behind and the url3 2 years behind
  getDataFromMultipleYears(
    url,
    urlLastYear = url,
    urlLastTwoYears = url
  ): Observable<any[]> {
    const currentDate = new Date().toISOString().split('T')[0];
    const lastYear = parseInt(currentDate.split('-')[0], 10) - 1;
    const lastYearStartDate = lastYear.toString() + '-01-01';
    const lastYearEndDate = lastYear.toString() + '-12-31';
    const lastTwoYears = lastYear - 1;
    const lastTwoYearsStartDate = lastTwoYears.toString() + '-01-01';
    const lastTwoYearsEndDate = lastTwoYears.toString() + '-12-31';

    urlLastYear =
      urlLastYear.split('=')[0] +
      '=' +
      lastYearStartDate +
      '&end=' +
      lastYearEndDate;
    urlLastTwoYears =
      urlLastTwoYears.split('=')[0] +
      '=' +
      lastTwoYearsStartDate +
      '&end=' +
      lastTwoYearsEndDate;

    const response1 = this.http.get(url);
    const response2 = this.http.get(urlLastYear);
    const response3 = this.http.get(urlLastTwoYears);
    return forkJoin([response1, response2, response3]);
  }
}
