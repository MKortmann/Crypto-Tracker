import { Component, OnInit } from '@angular/core';

import { CoinLoreService } from '../../../services/coinLore.service';
import { ExchangeService } from '../../../services/exchange.service';
import { Coin } from '../../../models/Coin';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-graphic-dashboard',
  templateUrl: './graphic-dashboard.component.html',
  styleUrls: ['./graphic-dashboard.component.scss'],
})
export class GraphicDashboardComponent implements OnInit {
  data: any;
  dataBar: any;
  dataDoughnut: any;
  dataCard: any;
  dataPolar: any;
  labels: any;
  coins: Coin[];
  selectRateEUR: any;

  constructor(
    private coinLoreService: CoinLoreService,
    private translate: TranslateService,
    private exchangeService: ExchangeService
  ) {}

  ngOnInit(): void {
    // NOT NECESSARY TO UPDATE... This can be load only the first time

    // this.coinLoreService.cast.subscribe((data) => {
    //   this.data = [...data];

    //   this.exchangeService.getMoney('USD').subscribe(
    //     (res) => {
    //       this.selectRateEUR = res.rates[`EUR`];
    //       this.getGlobalCoinLore();
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    // });

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

        console.log('DataCard', this.dataCard[0].name);

        this.dataDoughnut = {
          labels: ['Bitcoin', 'Ethereum', 'Others'],
          datasets: [
            {
              data: [
                newGlobalData[0].btc_d,
                newGlobalData[0].eth_d,
                (100 - newGlobalData[0].btc_d - newGlobalData[0].eth_d).toFixed(
                  2
                ),
              ],
              backgroundColor: ['#536472', '#FFA69E', '#B3DEC1'],
              hoverBackgroundColor: ['#536472', '#FFA69E', '#B3DEC1'],
            },
          ],
        };

        // this is necessary to allow the translate be called again, if not, we will need to refnewGlobalDatah the page!
        this.translate
          .stream('TRANSLATE.HOME.GRAPHIC_CARD.CRYPTOS')
          .subscribe((newGlobalData0: string) => {
            this.dataCard[0].name = newGlobalData0;
          });

        this.translate
          .stream('TRANSLATE.HOME.GRAPHIC_CARD.ACTIVE_MARKETS')
          .subscribe((newGlobalData1: string) => {
            this.dataCard[1].name = newGlobalData1;
          });

        this.translate
          .stream('TRANSLATE.HOME.GRAPHIC_CARD.TOTAL_OF_MARKET_CAP')
          .subscribe((newGlobalData2: string) => {
            this.dataCard[2].name = newGlobalData2;
          });

        this.translate
          .stream('TRANSLATE.HOME.GRAPHIC_CARD.TOTAL_OF_VOLUME')
          .subscribe((newGlobalData3: string) => {
            this.dataCard[3].name = newGlobalData3;
          });
      },
      (error2) => {
        console.log(error2);
      }
    );
  }
}
