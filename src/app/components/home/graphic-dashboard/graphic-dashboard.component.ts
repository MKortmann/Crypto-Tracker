import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../services/data.service';
import { Coin } from '../../../models/Coin';

@Component({
  selector: 'app-dashboard',
  templateUrl: './graphic-dashboard.component.html',
  styleUrls: ['./graphic-dashboard.component.css'],
})
export class GraphicDashboardComponent implements OnInit {
  data: any;
  dataBar: any;
  dataDoughnut: any;
  dataPolar: any;
  labels: any;
  coins: Coin[];

  constructor(private dataService: DataService) {}

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
    this.dataDoughnut = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };

    this.dataService.getGlobalCryptoData(0, 3).then((res) => {});
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
