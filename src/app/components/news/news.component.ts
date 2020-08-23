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
  newsBitcoin = 'https://news.bitcoin.com/feed/';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getNewsFeed();
  }

  getNewsFeed() {
    const requestOptions: object = {
      observe: 'body',
      responseType: 'text',
    };
    this.http.get<any>(this.newsBitcoin, requestOptions).subscribe((data) => {
      xml2js.parseString(data, (error, result: NewsRss) => {
        this.RssData = result;
        console.log(result);
      });
    });
  }
}
