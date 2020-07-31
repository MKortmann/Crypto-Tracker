import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubNavComponent } from './sub-nav.component';

import { HttpClient, HttpHandler } from '@angular/common/http';

import { CoinLoreService } from '../../services/coinLore.service';
import { ExchangeService } from '../../services/exchange.service';

describe('SubNavComponent', () => {
  let component: SubNavComponent;
  let fixture: ComponentFixture<SubNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubNavComponent],
      providers: [HttpClient, HttpHandler, CoinLoreService, ExchangeService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});