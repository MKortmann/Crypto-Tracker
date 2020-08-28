import { Component, OnInit, AfterViewInit } from '@angular/core';
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
export class NewsComponent implements OnInit, AfterViewInit {
  RssData: NewsRss;
  visibleSidebar = false;
  feedsUrl = FeedsUrl;

  feedArray = [];
  feedSavedArray = [];
  loops = this.feedsUrl.length;

  // worked
  newsBitcoin = 'https://news.bitcoin.com/feed/';
  ccn = 'https://www.ccn.com/feed/';
  deCrypt = 'https://decrypt.co/feed';
  blokt = 'https://blokt.com/feed';
  theBlockChain = 'https://www.the-blockchain.com/feed/';
  dateNow: string;

  // to look: feed2json.org or rss2json
  // Unblock using rss2json
  prefixRss2JSON = 'https://api.rss2json.com/v1/api.json?rss_url=';

  constructor(private http: HttpClient, private location: Location) {}

  ngOnInit(): void {
    this.dateNow = this.returnDateNow();

    if (this.dateNow === JSON.parse(localStorage.getItem('dateNow'))) {
      console.log('getting from LS');
      this.feedArray = JSON.parse(localStorage.getItem('feeds'));
    } else {
      // have we already stored
      if (localStorage.getItem('feeds')) {
        this.feedArray = JSON.parse(localStorage.getItem('feeds'));
      } else {
        // no! Then, store the start point
        this.feedArray = [...this.feedsUrl];
      }

      // fetch news
      for (const item of this.feedsUrl) {
        this.getNewsFeedsUrl(item);
      }
    }
  }

  ngAfterViewInit() {
    localStorage.setItem('dateNow', JSON.stringify(this.dateNow));
    this.feedArray.sort((a, b) => this.compare(a, b));
    localStorage.setItem('feeds', JSON.stringify(this.feedArray));
    console.log('SAVE FEEDS');
  }

  getNewsFeedsUrl(item) {
    const url = item.url;
    this.http
      .get<any>('https://api.rss2json.com/v1/api.json?rss_url=' + url)
      .subscribe(
        (data) => {
          // const bookmark = localStorage(JSON.stringify(item.id));

          data.items.forEach((each) => {
            each.bookmark = localStorage.getItem('each.id') || false;
          });

          this.feedArray[item.id].feed = { ...data.feed };
          this.feedArray[item.id].items = [...data.items];
        },
        (error) => {
          console.log(error);
        }
      );
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

  setBookmarkSave(event) {
    this.feedArray.forEach((item, index) => {
      if (item.name.trim() === event.name.trim()) {
        item.items[event.itemIndexArray].bookmark = !item.items[
          event.itemIndexArray
        ].bookmark;
        console.log(item.name);
        item.saved[0] = true;
        item.saved[1].indexes.push(event.itemIndexArray);
      }
    });

    localStorage.setItem('feeds', JSON.stringify(this.feedArray));
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
