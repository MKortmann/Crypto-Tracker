import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.scss'],
})
export class ExchangesComponent implements OnInit {
  public exchangesTotalNumber = 0;
  constructor() {}

  ngOnInit(): void {}

  receivedMessageFromChild(message) {
    console.log('MESSAGE', message);
    this.exchangesTotalNumber = message;
  }
}
