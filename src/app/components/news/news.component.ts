import { Component, OnInit } from '@angular/core';

import { FeedsUrl } from './feeds';
import { FeedNewsService } from '../../services/feed-news.service';

import { ConfirmationService, Message } from 'primeng/api';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  visibleSidebar = false;
  feedsUrl = FeedsUrl;

  feedArray = [];

  dateNow: string;
  msgs: Message[] = [];
  date: any;

  // Unblock using rss2json, to look: feed2json.org
  prefixRss2JSON = 'https://api.rss2json.com/v1/api.json?rss_url=';

  constructor(
    private feedNewsServices: FeedNewsService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    // this.date = Date.now();

    // this.dateNow = this.returnDateNow();

    this.feedArray = JSON.parse(localStorage.getItem('feeds')) || [
      ...this.feedsUrl,
    ];

    // fetch news
    //   console.log('Fetching new NEWS!');
    this.fetchNews();
  }

  confirmRefresh() {
    this.confirmationService.confirm({
      message: 'Do you want to reset the news?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        localStorage.removeItem('dateNow');
        localStorage.removeItem('feeds');
        this.msgs = [
          {
            severity: 'success',
            summary: 'Confirmed',
            detail: 'You have refreshed the news! The Page will be reload!',
          },
        ];

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      reject: () => {
        this.msgs = [
          {
            severity: 'info',
            summary: 'Not Confirmed',
            detail: 'News not refreshed!',
          },
        ];
      },
    });
  }

  refresh() {
    const res = confirm('Do you want to reset the news?');
    if (res) {
      localStorage.clear();
      window.location.reload();
    }
  }

  fetchNews() {
    this.feedNewsServices.getNewsFeedsUrl(this.feedsUrl).subscribe(
      (response) => {
        response.forEach((data, index) => {
          // we can delete the old news in case the array is too
          // big. In this case we delete the old 10 news, letting
          // the array with a size fixed at 30 after two days...
          if (this.feedArray[index].items.length > 30) {
            this.feedArray[index].items = this.feedArray[index].items.slice();
          }

          // inverting the order - ascending news
          for (let i = data.items.length - 1; i >= 0; i--) {
            this.feedArray[index].items.unshift({
              author: data.items[i].author,
              title: data.items[i].title,
              content: data.items[i].content,
              pubDate: data.items[i].pubDate,
              link: data.items[i].link,
            });
          }
        });

        // this.saveToLocalStorage();
      },
      (error) => {
        console.log('Fetching Error: getNewsFeedsUrl', error);
      }
    );
  }

  saveToLocalStorage() {
    localStorage.setItem('dateNow', JSON.stringify(this.dateNow));
    this.feedArray.sort((a, b) => this.compare(a, b));
    localStorage.setItem('feeds', JSON.stringify(this.feedArray));
    console.log('SAVE FEEDS');
    const date2 = Date.now();
    const delay = (this.date - Date.now()) / 10 ** 3;
    console.log('delay in seconds:', delay);
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
}
