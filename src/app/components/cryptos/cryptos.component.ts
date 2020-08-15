import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cryptos',
  templateUrl: './cryptos.component.html',
  styleUrls: ['./cryptos.component.scss'],
})
export class CryptosComponent implements OnInit {
  public visible = true;
  label = '24h';
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {}

  switchGraphs() {
    this.visible = !this.visible;
    if (this.label === '24h') {
      this.label = '1year';
    } else {
      this.label = '24h';
    }
  }
}
