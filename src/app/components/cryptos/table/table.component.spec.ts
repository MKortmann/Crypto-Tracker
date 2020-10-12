import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';

import { HttpClient, HttpHandler } from '@angular/common/http';

import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { CoinLoreService } from '../../../services/coinLore.service';

import { ExchangeService } from '../../../services/exchange.service';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        HttpClient,
        HttpHandler,
        TranslateService,
        CoinLoreService,
        ExchangeService,
      ],
      declarations: [TableComponent],
      // schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
