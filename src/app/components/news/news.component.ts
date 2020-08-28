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
          // this.feedArray[item.id].feed = { ...data.feed };
          // this.feedArray[item.id].items = [...data.items];
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

  setBookmarkMagazine(event) {
    this.feedArray.forEach((item, index) => {
      if (item.name.trim() === event.name.trim()) {
        item.bookmark = !item.bookmark;
        // localStorage.setItem(`${event.id}`, `${item.bookmark}`);
        console.log(item.bookmark);
      }
    });

    localStorage.setItem('feeds', JSON.stringify(this.feedArray));
  }

  setBookmarkSave(event) {
    this.feedArray.forEach((item, index) => {
      if (item.name.trim() === event.name.trim()) {
        this.setUnsetBookmarkSave(item, event);
      }
    });

    localStorage.setItem('feeds', JSON.stringify(this.feedArray));
  }

  setUnsetBookmarkSave(item, event) {
    // we have to find the itemIndexArray based on the pubData
    let itemIndexArray = -1;
    item.items.forEach((subItem, index) => {
      if (subItem.pubDate === event.itemPubDate) {
        itemIndexArray = index;
      }
    });

    // means that the item is in both list
    if (itemIndexArray !== -1) {
      // was not saved
      if (!item.items[itemIndexArray].bookmark) {
        item.items[itemIndexArray].bookmark = true;
        item.saved[0] = true;
        item.saved[1].items.push(item.items[itemIndexArray]);
        // was saved and we have more than one item
      } else if (item.saved[1].items.length > 1) {
        item.items[itemIndexArray].bookmark = false;
        item.saved[1].items.forEach((inItem, index) => {
          if (inItem.pubDate === event.itemPubDate) {
            item.saved[1].items.splice(index, 1);
          }
        });
        // was saved and we have just one item
      } else {
        item.items[itemIndexArray].bookmark = false;
        item.saved[0] = false;
        item.saved[1].items = [];
      }
    }

    // the item is an old item
    if (itemIndexArray === -1) {
      if (item.saved[1].items.length > 1) {
        item.saved[1].items.forEach((inItem, index) => {
          if (inItem.pubDate === event.itemPubDate) {
            item.saved[1].items.splice(index, 1);
          }
        });
        // was saved and we have just one item
      } else {
        item.saved[0] = false;
        item.saved[1].items = [];
      }
    }
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
