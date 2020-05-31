import { TestBed, inject } from '@angular/core/testing';

import { ExchangeService } from './exchange.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { Observable } from 'rxjs';

describe('ExchangeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExchangeService, HttpClient, HttpHandler],
    });
  });

  it('should be created', inject(
    [ExchangeService],
    (service: ExchangeService) => {
      expect(service).toBeTruthy();
    }
  ));
});
