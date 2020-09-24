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
  channel = 0;
  bookmarks = 0;
  bookmarkLimit = 5;

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
    this.bookmarks = JSON.parse(localStorage.getItem('bookmarksLimit')) || 0;
    this.feedArray = JSON.parse(localStorage.getItem('feeds')) || [
      ...this.feedsUrl,
    ];
    this.channel = JSON.parse(localStorage.getItem('channel')) || 0;
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
        this.sendMessage(
          'success',
          'Confirmed',
          'You have refreshed the news! The Page will be reload!'
        );
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      reject: () => {
        this.sendMessage('info', 'Not Confirmed', 'News not refreshed');
      },
    });
  }

  refresh() {
    const res = confirm('Do you want to reset the news?');
    if (res) {
      localStorage.clear();
      localStorage.setItem('feeds', undefined);
      localStorage.setItem('bookmarksLimit', JSON.stringify(0));
      window.location.reload();
    }
  }

  fetchNews() {
    this.feedNewsServices.getNewsFeedsUrl(this.feedsUrl).subscribe(
      (response) => {
        response.forEach((data, index) => {
          this.feedArray[index].items = [...data.items];
        });
      },
      (error) => {
        console.log('Fetching Error: getNewsFeedsUrl', error);
      }
    );
  }

  saveToLocalStorage() {
    // here we set the items to zero because it is too big and there is no need to save it!
    const tempFeedArray = this.feedArray.map((item) => ({
      ...item,
      items: [],
    }));
    localStorage.setItem('feeds', JSON.stringify(tempFeedArray));
    localStorage.setItem('bookmarksLimit', JSON.stringify(this.bookmarks));
  }

  scrollToTop() {
    window.scroll(0, 0);
  }

  loadNews($event, id) {
    this.visibleSidebar = false;
    this.channel = id;
    localStorage.setItem('channel', JSON.stringify(this.channel));
  }

  setBookmarkMagazine(event) {
    this.feedArray.forEach((item, index) => {
      if (item.name.trim() === event.name.trim()) {
        if (this.bookmarks < this.bookmarkLimit && !item.bookmark) {
          item.bookmark = !item.bookmark;
          this.bookmarks++;
          this.sendMessage('success', 'Bookmark successfully added');
        } else if (item.bookmark) {
          this.bookmarks--;
          item.bookmark = !item.bookmark;
          this.sendMessage('info', 'Bookmark successfully removed');
        } else {
          this.sendMessage(
            'error',
            'You reached the maximum of 5 bookmarks!',
            'Please, remove one bookmark to be able to add another one.'
          );
        }
      }
    });
    this.saveToLocalStorage();
  }

  sendMessage(severity, summary, detail = '') {
    this.msgs = [
      {
        severity,
        summary,
        detail,
      },
    ];
  }

  setSaveFeed(event) {
    this.feedArray.forEach((item, index) => {
      if (item.name.trim() === event.name.trim()) {
        this.setUnsetSaveFeed(item, event);
      }
    });

    this.saveToLocalStorage();
  }

  setUnsetSaveFeed(item, event) {
    // we have to find the itemIndexArray based on the pubData
    let itemIndexArray = -1;
    item.items.forEach((subItem, index) => {
      if (subItem.pubDate === event.itemPubDate) {
        itemIndexArray = index;
      }
    });

    // means that the item is in both list (news and saved)
    if (itemIndexArray !== -1) {
      // was not saved: we use the bookmark of the item to check it
      if (!item.items[itemIndexArray].bookmark) {
        item.items[itemIndexArray].bookmark = true;
        item.saved[0] = true;
        item.saved[1].items.push(item.items[itemIndexArray]);
        this.sendMessage('success', 'News Saved!');

        // was saved and we have more than one item saved
      } else if (item.saved[1].items.length > 1) {
        // register that the news is not save anymore
        item.items[itemIndexArray].bookmark = false;
        // remove the saved index news
        item.saved[1].items.forEach((inItem, index) => {
          if (inItem.pubDate === event.itemPubDate) {
            item.saved[1].items.splice(index, 1);
          }
        });
        this.sendMessage('info', 'News Deleted!');

        // was saved and we have just one item
      } else {
        item.items[itemIndexArray].bookmark = false;
        item.saved[0] = false;
        item.saved[1].items = [];
        this.sendMessage('info', 'News Deleted!');
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
