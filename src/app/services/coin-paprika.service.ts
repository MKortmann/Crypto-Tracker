import { Injectable, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

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
}
