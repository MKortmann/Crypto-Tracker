import { Component, OnInit, Renderer2 } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { NewsRss } from '../../../models/news-rss';

import * as xml2js from 'xml2js';

@Component({
  selector: 'app-other-feed',
  templateUrl: './other-feed.component.html',
  styleUrls: ['./other-feed.component.scss'],
})
export class OtherFeedComponent implements OnInit {
  RssFeed: NewsRss;
  description: any;
  title: any;
  lastBuildDate: any;
  link: any;
  items: any = [];

  // worked
  newsBitcoin = 'https://news.bitcoin.com/feed/';
  ccn = 'https://www.ccn.com/feed/';
  deCrypt = 'https://decrypt.co/feed';
  blokt = 'https://blokt.com/feed';
  theBlockChain = 'https://www.the-blockchain.com/feed/';

  constructor(private http: HttpClient, private renderer2: Renderer2) {}

  ngOnInit(): void {
    this.getOtherFeeds();
  }

  getOtherFeeds() {
    const requestOptions: object = {
      observe: 'body',
      responseType: 'text/html',
    };
    this.http.get<any>(this.newsBitcoin, requestOptions).subscribe(
      (data) => {
        xml2js.parseString(data, (error, result: NewsRss) => {
          this.RssFeed = result;
          console.log(this.RssFeed.rss.channel[0]);
          this.description = this.RssFeed.rss.channel[0].description;
          this.title = this.RssFeed.rss.channel[0].title;

          this.items = [...this.RssFeed.rss.channel[0].item];
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
