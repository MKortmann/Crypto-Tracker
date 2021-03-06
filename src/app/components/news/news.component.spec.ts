import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsComponent } from './news.component';

import { HttpClient, HttpHandler } from '@angular/common/http';

import { ConfirmationService } from 'primeng/api';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, ConfirmationService],
      declarations: [NewsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
