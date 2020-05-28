import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../services/data.service';
import { ExchangeService } from '../../../services/exchange.service';
import { Coin } from '../../../models/Coin';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './graphic-dashboard.component.html',
  styleUrls: ['./graphic-dashboard.component.css'],
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
    private dataService: DataService,
    private translate: TranslateService,
    private exchangeService: ExchangeService
  ) {}

  ngOnInit(): void {
    this.exchangeService.getMoney('USD').then((res) => {
      this.selectRateEUR = res.rates[`EUR`];
    });

    this.dataService.getGlobal().then((res) => {
      console.log('global:', res[0].btc_d);

      this.dataCard = [
        {
          name: this.translate.instant('TRANSLATE.HOME.GRAPHIC_CARD.CRYPTOS'),
          value: res[0].coins_count,
        },
        {
          name: this.translate.instant(
            'TRANSLATE.HOME.GRAPHIC_CARD.ACTIVE_MARKETS'
          ),
          value: res[0].active_markets,
        },
        {
          name: this.translate.instant(
            'TRANSLATE.HOME.GRAPHIC_CARD.TOTAL_OF_MARKET_CAP'
          ),
          value: res[0].total_mcap,
          value_usd: res[0].total_mcap,
          value_eur: res[0].total_mcap * this.selectRateEUR,
        },
        {
          name: this.translate.instant(
            'TRANSLATE.HOME.GRAPHIC_CARD.TOTAL_OF_VOLUME'
          ),
          value: res[0].total_volume,
          value_usd: res[0].total_volume,
          value_eur: res[0].total_volume * this.selectRateEUR,
        },
      ];

      console.log('DataCard', this.dataCard[0].name);

      this.dataDoughnut = {
        labels: ['Bitcoin', 'Ethereum', 'Others'],
        datasets: [
          {
            data: [
              res[0].btc_d,
              res[0].eth_d,
              (100 - res[0].btc_d - res[0].eth_d).toFixed(2),
            ],
            backgroundColor: ['#FFCE56', '#FF6384', '#36A2EB'],
            hoverBackgroundColor: ['#FFCE56', '#FF6384', '#36A2EB'],
          },
        ],
      };

      // this is necessary to allow the translate be called again, if not, we will need to refresh the page!
      this.translate
        .stream('TRANSLATE.HOME.GRAPHIC_CARD.CRYPTOS')
        .subscribe((res0: string) => {
          this.dataCard[0].name = res0;
        });

      this.translate
        .stream('TRANSLATE.HOME.GRAPHIC_CARD.ACTIVE_MARKETS')
        .subscribe((res1: string) => {
          this.dataCard[1].name = res1;
        });

      this.translate
        .stream('TRANSLATE.HOME.GRAPHIC_CARD.TOTAL_OF_MARKET_CAP')
        .subscribe((res2: string) => {
          this.dataCard[2].name = res2;
        });

      this.translate
        .stream('TRANSLATE.HOME.GRAPHIC_CARD.TOTAL_OF_VOLUME')
        .subscribe((res3: string) => {
          this.dataCard[3].name = res3;
        });
    });
  }
}
