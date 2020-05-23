import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../services/data.service';
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

  constructor(
    private dataService: DataService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.dataPolar = {
      datasets: [
        {
          data: [11, 16, 7, 3, 14],
          backgroundColor: [
            '#FF6384',
            '#4BC0C0',
            '#FFCE56',
            '#E7E9ED',
            '#36A2EB',
          ],
          label: 'My dataset',
        },
      ],
      labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
    };

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
        },
        {
          name: this.translate.instant(
            'TRANSLATE.HOME.GRAPHIC_CARD.TOTAL_OF_VOLUME'
          ),
          value: res[0].total_volume,
        },
      ];

      console.log('DataCard', this.dataCard);

      this.dataDoughnut = {
        labels: ['Bitcoin', 'Ethereum', 'Others'],
        datasets: [
          {
            data: [
              res[0].btc_d,
              res[0].eth_d,
              100 - res[0].btc_d - res[0].eth_d,
            ],
            backgroundColor: ['#FFCE56', '#FF6384', '#36A2EB'],
            hoverBackgroundColor: ['#FFCE56', '#FF6384', '#36A2EB'],
          },
        ],
      };
    });

    this.dataService.getGlobalCryptoData(0, 7).then((res) => {
      this.labels = res.data.map((data) => data.name);
      console.log(this.labels);
      console.log(res);

      this.dataBar = {
        labels: [...this.labels],
        datasets: [
          {
            label: 'Change 1h',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: [65, 59, 80, 81, 56, 55, 40],
          },
          {
            label: 'Change 24h',
            backgroundColor: '#9CCC65',
            borderColor: '#7CB342',
            data: [28, 48, 40, 19, 86, 27, 90],
          },
          {
            label: 'Change 7 days',
            backgroundColor: '#9CCC65',
            borderColor: '#7CB342',
            data: [28, 48, 40, 19, 86, 27, 90],
          },
        ],
      };
    });
    this.dataBar = {
      labels: [this.labels],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: 'My Second dataset',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    };
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: '#1E88E5',
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: '#7CB342',
        },
      ],
    };
  }
}
