import { TestBed } from '@angular/core/testing';

import { CoinPaprikaService } from './coin-paprika.service';

import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
// import { Observable } from 'rxjs';

describe('CoinPaprikaService', () => {
  let service: CoinPaprikaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, Injectable, EventEmitter],
    });
    service = TestBed.inject(CoinPaprikaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
