import { TestBed, inject } from '@angular/core/testing';
import { CoinLoreService } from './coinLore.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('CoinLoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoinLoreService, HttpClient, HttpHandler],
    });
  });

  it('should be created', inject(
    [CoinLoreService],
    (service: CoinLoreService) => {
      expect(service).toBeTruthy();
    }
  ));
});
