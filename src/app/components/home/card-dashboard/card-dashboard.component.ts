import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-card-dashboard',
  templateUrl: './card-dashboard.component.html',
  styleUrls: ['./card-dashboard.component.css'],
})
export class CardDashboardComponent implements OnInit {
  // labels: any;
  // prices: any;
  data: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getGlobalCryptoData(0, 12).then((res) => {
      // this.labels = res.data.map((data) => data.name);
      // this.prices = res.data.map((data) => data.price);
      this.data = res.data;
      console.log(this.data);
    });
  }
}
