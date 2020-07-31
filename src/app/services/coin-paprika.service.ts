import { Injectable, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoinPaprikaService {
  public onSelectedCoinChange: EventEmitter<any> = new EventEmitter();
  public onSelectCoinName: EventEmitter<any> = new EventEmitter();

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

  /*btc: btc-bitcoin*/

  constructor(private http: HttpClient) {}

  public selectedCoinById(value: any) {
    const url = `${this.getListOfCoins}${value}/ohlcv/historical?start=2020-01-01&end=2020-07-31`;
    // Date.now()

    // const dataToEmit = this.getData(url);
    this.onSelectedCoinChange.emit(url);
    this.onSelectCoinName.emit(value);
  }

  getData(url): Observable<any> {
    return this.http.get<any>(url);
  }
}
