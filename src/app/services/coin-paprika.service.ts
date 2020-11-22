import { Injectable, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CoinPaprikaService {
  public onSelectedCoinChange: EventEmitter<any> = new EventEmitter();

  private readonly getListOfCoinsUrl = 'https://api.coinpaprika.com/v1/coins/';

  private readonly getSingleCoin =
    'https://api.coinpaprika.com/v1/coins/btc-bitcoin';

  private readonly getExchangeForCoin =
    'https://api.coinpaprika.com/v1/coins/btc-bitcoin/markets';

  // get all exchanges
  private readonly getAllExchangesUrl =
    'https://api.coinpaprika.com/v1/exchanges';

  private readonly getOHLCFullDayLatest =
    'https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/latest';

  // private readonly getOHLCFullDayTodayUrl =
  //   `https://api.coinpaprika.com/v1/coins/${{coinName}}/ohlcv/today`;

  private readonly getHistoricalStartEnd =
    'https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/historical?start=2019-01-01&end=2019-01-20';

  // tickers: show percentage change: 15m, 30m, 1h, 6h, 12h, 24h, 7d, 30d, 1y
  private readonly getCoinTickers = 'https://api.coinpaprika.com/v1/tickers/';
  // private readonly getCoinTickers =
  // 'https://api.coinpaprika.com/v1/tickers/btc-bitcoin/historical?start=2019-01-01&end=2019-01-20';

  /*btc: btc-bitcoin*/

  constructor(private http: HttpClient) {}

  public selectedCoinByTickers(coin, start, end): Observable<any> {
    const url = `${this.getCoinTickers}${coin}/historical?start=${start}&end=${end}`;
    return this.http.get<any>(url);
  }

  public selectedCoinById(value: string) {
    this.onSelectedCoinChange.emit(value);
  }

  public getData(url): Observable<any> {
    return this.http.get<any>(url);
  }

  public getAllExchanges(): Observable<any> {
    return this.http.get<any>(this.getAllExchangesUrl);
  }

  // not in use but get a list of more 1000 coins! Amazing!
  public getListOfCoins(): Observable<any> {
    return this.http.get<any>(this.getListOfCoinsUrl);
  }

  public getOHLCFullDayToday(coinName: string): Observable<any> {
    const url =
      'https://api.coinpaprika.com/v1/coins/' + coinName + '/ohlcv/today';
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

    const numberOfUrls = 3;
    const listOfUrls = [url, urlLastYear, urlLastTwoYears];

    const response = this.prepareListForForkJoin(listOfUrls);

    return forkJoin(response);
  }

  private prepareListForForkJoin(listOfUrls) {
    const response = [];
    for (const item of listOfUrls) {
      response.push(
        this.http.get<any>(item).pipe(
          map((res) => res),
          catchError((e) => of('Fetch Error'))
        )
      );
    }
    return response;
  }
}
