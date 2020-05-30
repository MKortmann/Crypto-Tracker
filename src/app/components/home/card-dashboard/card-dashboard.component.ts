import { Component, OnInit } from '@angular/core';

import { CoinLoreService } from '../../../services/coinLore.service';

import { ExchangeService } from '../../../services/exchange.service';

@Component({
  selector: 'app-card-dashboard',
  templateUrl: './card-dashboard.component.html',
  styleUrls: ['./card-dashboard.component.css'],
})
export class CardDashboardComponent implements OnInit {
  // labels: any;
  // prices: any;
  data: any;
  selectRateEUR: number;

  constructor(
    private coinLoreService: CoinLoreService,
    private exchangeService: ExchangeService
  ) {}

  ngOnInit(): void {
    this.coinLoreService.getGlobalCryptoData(0, 12).then((res) => {
      // this.labels = res.data.map((data) => data.name);
      // this.prices = res.data.map((data) => data.price);
      this.data = [...res.data];
      console.log(this.data);
    });

    this.exchangeService.getMoney('USD').then((res) => {
      this.selectRateEUR = res.rates[`EUR`];
      console.log(this.selectRateEUR);

      this.data.forEach((item) => {
        item[`price_eur`] = item.price_usd * res.rates[`price_eur`];
        // console.log(item);
      });
      console.log(this.data);
    });
  }
}
