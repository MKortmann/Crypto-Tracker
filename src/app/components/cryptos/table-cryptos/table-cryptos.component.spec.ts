import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCryptosComponent } from './table-cryptos.component';

import { HttpClient, HttpHandler } from '@angular/common/http';

import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { CoinLoreService } from '../../../services/coinLore.service';

import { ExchangeService } from '../../../services/exchange.service';

describe('TableCryptosComponent', () => {
  let component: TableCryptosComponent;
  let fixture: ComponentFixture<TableCryptosComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [TranslateModule.forRoot()],
        providers: [
          HttpClient,
          HttpHandler,
          TranslateService,
          CoinLoreService,
          ExchangeService,
        ],
        declarations: [TableCryptosComponent],
        // schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCryptosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
