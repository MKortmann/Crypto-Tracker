import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptosComponent } from './cryptos.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { HttpClient, HttpHandler } from '@angular/common/http';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CryptosComponent', () => {
  let component: CryptosComponent;
  let fixture: ComponentFixture<CryptosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [TranslateService, HttpClient, HttpHandler],
      declarations: [CryptosComponent],
      // schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
