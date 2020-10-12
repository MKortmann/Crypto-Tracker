import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableExchangesComponent } from './table-exchanges.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('TableExchangesComponent', () => {
  let component: TableExchangesComponent;
  let fixture: ComponentFixture<TableExchangesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TableExchangesComponent],
      providers: [HttpClient, HttpHandler],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableExchangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
