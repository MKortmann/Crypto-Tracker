import { TestBed } from '@angular/core/testing';

import { CoinPaprikaService } from './coin-paprika.service';

describe('CoinPaprikaService', () => {
  let service: CoinPaprikaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinPaprikaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
