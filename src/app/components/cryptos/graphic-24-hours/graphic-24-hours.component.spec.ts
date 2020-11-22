import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { Graphic24HoursComponent } from './graphic-24-hours.component';

import { CoinPaprikaService } from '../../../services/coin-paprika.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { ExchangeService } from '../../../services/exchange.service';

describe('Graphic24HoursComponent', () => {
  let component: Graphic24HoursComponent;
  let fixture: ComponentFixture<Graphic24HoursComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [Graphic24HoursComponent],
        imports: [TranslateModule.forRoot()],
        providers: [
          HttpClient,
          HttpHandler,
          CoinPaprikaService,
          ExchangeService,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(Graphic24HoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
