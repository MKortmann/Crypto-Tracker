import { Component, OnInit } from '@angular/core';

import { CoinLoreService } from '../../../services/coinLore.service';
import { ExchangeService } from '../../../services/exchange.service';
import { Coin } from '../../../models/Coin';
import { TranslateService } from '@ngx-translate/core';
import { GLOBAL_VARIABLES } from '../../../globals/global-constants';

@Component({
  selector: 'app-cards-global-data',
  templateUrl: './cards-global-data.component.html',
  styleUrls: ['./cards-global-data.component.scss'],
})
export class CardsGlobalDataComponent implements OnInit {
  dataCard: any;
  coins: Coin[];
  selectRateEUR: number;

  constructor(
    private coinLoreService: CoinLoreService,
    private translate: TranslateService,
    private exchangeService: ExchangeService
  ) {}

  ngOnInit(): void {
    this.exchangeService.getMoney(GLOBAL_VARIABLES.USD).subscribe(
      (res) => {
        this.selectRateEUR = res.rates[GLOBAL_VARIABLES.EUR];
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
            name: this.translate.instant(
              'TRANSLATE.CRYPTOS.GRAPHIC_CARD.BITCOIN'
            ),
            value: newGlobalData[0].btc_d + '%',
          },
          {
            name: this.translate.instant(
              'TRANSLATE.CRYPTOS.GRAPHIC_CARD.ETHEREUM'
            ),
            value: newGlobalData[0].eth_d + '%',
          },
          {
            name: this.translate.instant(
              'TRANSLATE.CRYPTOS.GRAPHIC_CARD.CRYPTOS'
            ),
            value: newGlobalData[0].coins_count,
          },
          {
            name: this.translate.instant(
              'TRANSLATE.CRYPTOS.GRAPHIC_CARD.ACTIVE_MARKETS'
            ),
            value: newGlobalData[0].active_markets,
          },
          {
            name: this.translate.instant(
              'TRANSLATE.CRYPTOS.GRAPHIC_CARD.TOTAL_OF_MARKET_CAP'
            ),
            value: newGlobalData[0].total_mcap,
            value_usd: newGlobalData[0].total_mcap,
            value_eur: newGlobalData[0].total_mcap * this.selectRateEUR,
          },
          {
            name: this.translate.instant(
              'TRANSLATE.CRYPTOS.GRAPHIC_CARD.TOTAL_OF_VOLUME'
            ),
            value: newGlobalData[0].total_volume,
            value_usd: newGlobalData[0].total_volume,
            value_eur: newGlobalData[0].total_volume * this.selectRateEUR,
          },
        ];

        this.updateLanguageTranslation();
      },
      (error2) => {
        console.log(error2);
      }
    );
  }

  private updateLanguageTranslation() {
    this.translate
      .stream('TRANSLATE.CRYPTOS.GRAPHIC_CARD.BITCOIN')
      .subscribe((res: string) => {
        this.dataCard[0].name = res;
      });
    this.translate
      .stream('TRANSLATE.CRYPTOS.GRAPHIC_CARD.ETHEREUM')
      .subscribe((res: string) => {
        this.dataCard[1].name = res;
      });
    this.translate
      .stream('TRANSLATE.CRYPTOS.GRAPHIC_CARD.CRYPTOS')
      .subscribe((res: string) => {
        this.dataCard[2].name = res;
      });

    this.translate
      .stream('TRANSLATE.CRYPTOS.GRAPHIC_CARD.ACTIVE_MARKETS')
      .subscribe((res: string) => {
        this.dataCard[3].name = res;
      });

    this.translate
      .stream('TRANSLATE.CRYPTOS.GRAPHIC_CARD.TOTAL_OF_MARKET_CAP')
      .subscribe((res: string) => {
        this.dataCard[4].name = res;
      });

    this.translate
      .stream('TRANSLATE.CRYPTOS.GRAPHIC_CARD.TOTAL_OF_VOLUME')
      .subscribe((res: string) => {
        this.dataCard[5].name = res;
      });
  }
}
