import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsCryptosComponent } from './cards-cryptos.component';

import { HttpClient, HttpHandler } from '@angular/common/http';

import { CoinLoreService } from '../../../services/coinLore.service';

import { ExchangeService } from '../../../services/exchange.service';

describe('CardsCryptosComponent', () => {
  let component: CardsCryptosComponent;
  let fixture: ComponentFixture<CardsCryptosComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CardsCryptosComponent],
        providers: [HttpClient, HttpHandler, CoinLoreService, ExchangeService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsCryptosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
