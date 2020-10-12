import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDashboardGlobalComponent } from './card-dashboard-global.component';

import { HttpClient, HttpHandler } from '@angular/common/http';

import { TranslateService, TranslateModule } from '@ngx-translate/core';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CardDashboardGlobalComponent', () => {
  let component: CardDashboardGlobalComponent;
  let fixture: ComponentFixture<CardDashboardGlobalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [HttpClient, HttpHandler, TranslateService],
      declarations: [CardDashboardGlobalComponent],
      // schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDashboardGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
