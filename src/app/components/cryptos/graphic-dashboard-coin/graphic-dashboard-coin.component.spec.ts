import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicDashboardCoinComponent } from './graphic-dashboard-coin.component';

import { CoinPaprikaService } from '../../../services/coin-paprika.service';

import { HttpClient, HttpHandler } from '@angular/common/http';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { options } from './graphic-options';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

describe('GraphicDashboardCoinComponent', () => {
  let component: GraphicDashboardCoinComponent;
  let fixture: ComponentFixture<GraphicDashboardCoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GraphicDashboardCoinComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        HttpClient,
        HttpHandler,
        CoinPaprikaService,
        TranslateService,
      ],
      // schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
