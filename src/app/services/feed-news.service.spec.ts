import { TestBed } from '@angular/core/testing';

import { HttpClient, HttpHandler } from '@angular/common/http';

import { FeedNewsService } from './feed-news.service';

describe('FeedNewsService', () => {
  let service: FeedNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    });
    service = TestBed.inject(FeedNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
