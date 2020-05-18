import { Component, OnInit } from '@angular/core';

import { TableModule } from 'primeng/table';
import { DataService, Coin } from '../../../services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  coins: Coin[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getGlobalCryptoData().then((res) => {
      this.coins = res.data;
      console.log(this.coins);
    });
  }
}
