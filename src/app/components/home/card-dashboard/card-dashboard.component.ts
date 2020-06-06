import { Component, OnInit } from '@angular/core';

import { CoinLoreService } from '../../../services/coinLore.service';

import { ExchangeService } from '../../../services/exchange.service';

@Component({
  selector: 'app-card-dashboard',
  templateUrl: './card-dashboard.component.html',
  styleUrls: ['./card-dashboard.component.scss'],
})
export class CardDashboardComponent implements OnInit {
  data: any;

  constructor(
    private coinLoreService: CoinLoreService,
    private exchangeService: ExchangeService
  ) {}

  ngOnInit(): void {
    this.coinLoreService.getGlobalCryptoData(0, 12).subscribe((res) => {
      this.data = [...res.data];

      this.exchangeService.getMoney('USD').subscribe((res2) => {
        this.data.forEach((item) => {
          item[`price_eur`] = item.price_usd * res2.rates[`EUR`];
        });
      });
    });
  }
}
