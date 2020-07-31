import { TestBed } from '@angular/core/testing';

import { CoinPaprikaService } from './coin-paprika.service';

import { HttpClient, HttpHandler } from '@angular/common/http';

describe('CoinPaprikaService', () => {
  let service: CoinPaprikaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    });
    service = TestBed.inject(CoinPaprikaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
