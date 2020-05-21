import { Component, OnInit } from '@angular/core';

import { DataService, Coin } from '../../../services/data.service';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  coins: Coin[];
  factor: number = 1.09;

  constructor(
    private dataService: DataService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.dataService.getGlobalCryptoData().then((res) => {
      this.coins = res.data;
      console.log(this.coins);
    });
  }

  filterGlobal() {
    console.log('hello');
  }
}
