import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicDashboardTickersComponent } from './graphic-dashboard-tickers.component';

import { CoinPaprikaService } from '../../../services/coin-paprika.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { ExchangeService } from '../../../services/exchange.service';

describe('GraphicDashboardTickersComponent', () => {
  let component: GraphicDashboardTickersComponent;
  let fixture: ComponentFixture<GraphicDashboardTickersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GraphicDashboardTickersComponent],
      imports: [TranslateModule.forRoot()],
      providers: [HttpClient, HttpHandler, CoinPaprikaService, ExchangeService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicDashboardTickersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
