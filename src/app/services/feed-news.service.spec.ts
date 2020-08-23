import { TestBed } from '@angular/core/testing';

import { FeedNewsService } from './feed-news.service';

describe('FeedNewsService', () => {
  let service: FeedNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
