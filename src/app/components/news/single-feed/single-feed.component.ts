import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-feed',
  templateUrl: './single-feed.component.html',
  styleUrls: ['./single-feed.component.scss'],
})
export class SingleFeedComponent implements OnInit {
  @Input()
  channel: any = {
    id: 55,
    name: 'Global Crypto Press',
    symbol: 'globalcryptopress',
    url: 'https%3A%2F%2Fwww.globalcryptopress.com%2Ffeeds%2Fposts%2Fdefault',
    bookmark: false,
  };
  constructor() {}

  ngOnInit(): void {}
}
