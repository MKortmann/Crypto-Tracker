import { Component, OnInit } from '@angular/core';

import { CoinLoreService } from '../../../services/coinLore.service';
import { CoinPaprikaService } from '../../../services/coin-paprika.service';
import { ExchangeService } from '../../../services/exchange.service';
import { Coin } from '../../../models/Coin';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-card-dashboard-global',
  templateUrl: './card-dashboard-global.component.html',
  styleUrls: ['./card-dashboard-global.component.scss'],
})
export class CardDashboardGlobalComponent implements OnInit {
  dataCard: any;
  dataCard2: any;

  coins: Coin[];
  selectRateEUR: any;

  constructor(
    private coinLoreService: CoinLoreService,
    private translate: TranslateService,
    private exchangeService: ExchangeService,
    private coinPaprikaService: CoinPaprikaService
  ) {}

  ngOnInit(): void {
    this.exchangeService.getMoney('USD').subscribe(
      (res) => {
        this.selectRateEUR = res.rates[`EUR`];
        this.getGlobalCoinLore();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getGlobalCoinLore() {
    this.coinLoreService.getGlobal().subscribe(
      (newGlobalData) => {
        this.dataCard = [
          {
            name: this.translate.instant('TRANSLATE.HOME.GRAPHIC_CARD.BITCOIN'),
            value: newGlobalData[0].btc_d + '%',
          },
          {
            name: this.translate.instant(
              'TRANSLATE.HOME.GRAPHIC_CARD.ETHEREUM'
            ),
            value: newGlobalData[0].eth_d + '%',
          },
          {
            name: this.translate.instant('TRANSLATE.HOME.GRAPHIC_CARD.CRYPTOS'),
            value: newGlobalData[0].coins_count,
          },
          {
            name: this.translate.instant(
              'TRANSLATE.HOME.GRAPHIC_CARD.ACTIVE_MARKETS'
            ),
            value: newGlobalData[0].active_markets,
          },
          {
            name: this.translate.instant(
              'TRANSLATE.HOME.GRAPHIC_CARD.TOTAL_OF_MARKET_CAP'
            ),
            value: newGlobalData[0].total_mcap,
            value_usd: newGlobalData[0].total_mcap,
            value_eur: newGlobalData[0].total_mcap * this.selectRateEUR,
          },
          {
            name: this.translate.instant(
              'TRANSLATE.HOME.GRAPHIC_CARD.TOTAL_OF_VOLUME'
            ),
            value: newGlobalData[0].total_volume,
            value_usd: newGlobalData[0].total_volume,
            value_eur: newGlobalData[0].total_volume * this.selectRateEUR,
          },
        ];

        // this is necessary to allow the translate be called again, if not, we will need to refnewGlobalDatah the page!
        this.translate
          .stream('TRANSLATE.HOME.GRAPHIC_CARD.BITCOIN')
          .subscribe((res: string) => {
            this.dataCard[0].name = res;
          });
        this.translate
          .stream('TRANSLATE.HOME.GRAPHIC_CARD.ETHEREUM')
          .subscribe((res: string) => {
            this.dataCard[1].name = res;
          });
        this.translate
          .stream('TRANSLATE.HOME.GRAPHIC_CARD.CRYPTOS')
          .subscribe((res: string) => {
            this.dataCard[2].name = res;
          });

        this.translate
          .stream('TRANSLATE.HOME.GRAPHIC_CARD.ACTIVE_MARKETS')
          .subscribe((res: string) => {
            this.dataCard[3].name = res;
          });

        this.translate
          .stream('TRANSLATE.HOME.GRAPHIC_CARD.TOTAL_OF_MARKET_CAP')
          .subscribe((res: string) => {
            this.dataCard[4].name = res;
          });

        this.translate
          .stream('TRANSLATE.HOME.GRAPHIC_CARD.TOTAL_OF_VOLUME')
          .subscribe((res: string) => {
            this.dataCard[5].name = res;
          });

        console.log('this.dataCard', this.dataCard);
      },
      (error2) => {
        console.log(error2);
      }
    );
  }
}
