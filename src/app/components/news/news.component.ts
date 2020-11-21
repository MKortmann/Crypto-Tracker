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
  private readonly prefixRss2JSON =
    'https://api.rss2json.com/v1/api.json?rss_url=';

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
        localStorage.removeItem('bookmarksLimit');
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

  fetchNews() {
    this.feedNewsServices.getNewsFeedsUrl(this.feedsUrl).subscribe(
      (response) => {
        response.forEach((data, index) => {
          if (data !== 'Error') {
            this.feedArray[index].items = [...data.items];
          } else {
            this.feedArray[index].items = [
              {
                title: 'ERROR',
              },
            ];
          }
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

  // here we select the correct feed item of the list of feeds
  selectFeedToSaveItem(event) {
    this.feedArray.forEach((item, index) => {
      if (item.name.trim() === event.name.trim()) {
        this.saveOrDeleteItemOfSelectedFeed(item, event);
      }
    });

    this.saveToLocalStorage();
  }

  saveOrDeleteItemOfSelectedFeed(item, event) {
    // if you clicked to delete then event.index = undefined
    if (event.index !== undefined) {
      // item is in the actual list, check if it is also in the save list
      if (item.items[event.index].bookmark) {
        item.saved[1].items.forEach((subItem, index) => {
          // if the item was saved before, delete it
          if (subItem.pubDate === event.pubDate) {
            item.saved[1].items.splice(index, 1);
            this.sendMessage('info', 'News Deleted!');
            item.items[event.index].bookmark = false;
          }
        });
      } else {
        // saved array empty, so we add the first news
        // add item
        item.saved[1].items.push(item.items[event.index]);
        this.sendMessage('success', 'News Saved!');
        item.items[event.index].bookmark = true;
      }
      // OLD ITEM, SO MUST BE DELETED
    } else {
      // the item is not in the actual list, means that we clicked at close button
      item.saved[1].items.forEach((subItem, index) => {
        if (subItem.pubDate === event.pubDate) {
          item.saved[1].items.splice(index, 1);
          this.sendMessage('info', 'News Deleted!');
        }
      });
      // here check if the item is in the actual list, so remove bookmark
      item.items.forEach((subItem, index) => {
        if (subItem.pubDate === event.pubDate) {
          item.items[index].bookmark = false;
        }
      });
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
