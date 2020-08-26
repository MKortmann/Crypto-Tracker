import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import * as xml2js from 'xml2js';
import { NewsRss } from '../../models/news-rss';
import { FeedsUrl } from './feeds';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  RssData: NewsRss;
  visibleSidebar = false;
  feedsUrl = FeedsUrl;

  feedArray = [];

  // worked
  newsBitcoin = 'https://news.bitcoin.com/feed/';
  ccn = 'https://www.ccn.com/feed/';
  deCrypt = 'https://decrypt.co/feed';
  blokt = 'https://blokt.com/feed';
  theBlockChain = 'https://www.the-blockchain.com/feed/';

  // Using rss feed app free
  // coinDesk = 'https://rss.app/feeds/eawQ6rZvhg7nQhpa.xml';

  // Unblock using feed2json.org
  prefixRss2JSONFeed = 'https://feed2json.org/convert?url=';

  // Unblock using rss2json
  prefixRss2JSON = 'https://api.rss2json.com/v1/api.json?rss_url=';

  constructor(private http: HttpClient, private location: Location) {}

  ngOnInit(): void {
    const dateNow = this.returnDateNow();

    if (dateNow === JSON.parse(localStorage.getItem('dateNow'))) {
      console.log('getting from LS');
      this.feedArray = JSON.parse(localStorage.getItem('feeds'));
      // this.feedArray.sort((a, b) => this.compare(a, b));
    } else {
      if (localStorage.getItem('feeds')) {
        this.feedArray = JSON.parse(localStorage.getItem('feeds'));
        // getting the saved bookmarks but delete the old news!
        this.feedArray.forEach((item) => {
          item.feed = {};
          item.items = [];
        });

        for (const item of this.feedsUrl) {
          this.getNewsFeedsUrl(item, false);
        }
      } else {
        for (const item of this.feedsUrl) {
          this.getNewsFeedsUrl(item, true);
        }
      }
    }
  }

  compare(a, b) {
    const tempA = a.name.toLowerCase().trim();
    const tempB = b.name.toLowerCase().trim();

    let comparison = 0;
    if (tempA > tempB) {
      comparison = 1;
    } else {
      comparison = -1;
    }

    return comparison;
  }

  scrollToTop() {
    window.scroll(0, 0);
  }

  loadNews($event) {
    this.visibleSidebar = false;
  }

  setBookmarkMagazine($event) {
    const name = $event.currentTarget.parentNode.innerText;

    this.feedArray.forEach((item, index) => {
      if (item.name.trim() === name.trim()) {
        item.bookmark = !item.bookmark;
        console.log(item.bookmark);
      }
    });

    localStorage.setItem('feeds', JSON.stringify(this.feedArray));
  }

  getNewsFeedsUrl(item, firstTime) {
    const url = item.url;
    this.http
      .get<any>('https://api.rss2json.com/v1/api.json?rss_url=' + url)
      .subscribe(
        (data) => {
          // const bookmark = localStorage(JSON.stringify(item.id));
          if (firstTime) {
            this.feedArray.push({
              ...data,
              ...item,
            });
          } else {
            this.feedArray.push({
              ...data,
            });
          }

          if (this.feedArray.length >= this.feedsUrl.length) {
            this.feedArray.sort((a, b) => this.compare(a, b));
            localStorage.setItem('feeds', JSON.stringify(this.feedArray));
            const dateNow = this.returnDateNow();
            localStorage.setItem('dateNow', JSON.stringify(dateNow));
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  returnDateNow() {
    const dateNow =
      new Date().getFullYear() +
      '.' +
      new Date().getMonth() +
      '.' +
      new Date().getDate();
    return dateNow;
  }

  getNewsFeed() {
    const requestOptions: object = {
      observe: 'body',
      responseType: 'text/html',
    };
    this.http
      .get<any>('https://www.financemagnates.com/feed/', requestOptions)
      .subscribe(
        (data) => {
          xml2js.parseString(data, (error, result: NewsRss) => {
            this.RssData = result;
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
