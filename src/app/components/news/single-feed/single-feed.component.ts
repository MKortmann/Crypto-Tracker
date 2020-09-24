import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  @Input()
  atSavedTab = false;
  @Input()
  atFullTab = true;

  @Output() clickedBookmark = new EventEmitter<string>();

  @Output() clickedToSaveFeed = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  sendTriggerToParent($event) {
    this.clickedBookmark.emit($event);
  }

  sendTriggerToSaveToParent($event) {
    this.clickedToSaveFeed.emit($event);
  }
}
