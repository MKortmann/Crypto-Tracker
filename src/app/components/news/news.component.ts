import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as xml2js from 'xml2js';
import { NewsRss } from '../../models/news-rss';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  RssData: NewsRss;
  // worked
  newsBitcoin = 'https://news.bitcoin.com/feed/';

  // Using rss feed app free
  coinDesk = 'https://rss.app/feeds/eawQ6rZvhg7nQhpa.xml';
  coinTelegraph = 'https://rss.app/feeds/C0iw2FvLIMGBk9A7.xml';
  mixCoinDeskCoinTelegraph = 'http://www.rssmix.com/u/12026658/rss.xml';

  // blocked why?
  ambCrypto = 'https://eng.ambcrypto.com/feed/';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getNewsFeed();
  }

  getNewsFeed() {
    const requestOptions: object = {
      observe: 'body',
      responseType: 'text',
    };
    this.http.get<any>(this.mixCoinDeskCoinTelegraph, requestOptions).subscribe(
      (data) => {
        xml2js.parseString(data, (error, result: NewsRss) => {
          this.RssData = result;
          console.log(result);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
