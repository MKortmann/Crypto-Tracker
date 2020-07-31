import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicDashboardCoinComponent } from './graphic-dashboard-coin.component';

import { CoinPaprikaService } from '../../../services/coin-paprika.service';

import { HttpClient, HttpHandler } from '@angular/common/http';

describe('GraphicDashboardCoinComponent', () => {
  let component: GraphicDashboardCoinComponent;
  let fixture: ComponentFixture<GraphicDashboardCoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GraphicDashboardCoinComponent],
      providers: [HttpClient, HttpHandler, CoinPaprikaService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicDashboardCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
