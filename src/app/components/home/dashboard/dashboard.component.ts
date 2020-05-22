import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../services/data.service';
import { Coin } from '../../../models/Coin';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  data: any;
  dataBar: any;
  labels: any;
  coins: Coin[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getGlobalCryptoData(0, 7).then((res) => {
      this.labels = res.data.map((data) => data.name);
      console.log(this.labels);
      console.log(res);

      this.dataBar = {
        labels: [...this.labels],
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
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    };
  }
}
