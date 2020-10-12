import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFeedComponent } from './single-feed.component';

import { HttpClient, HttpHandler } from '@angular/common/http';

describe('SingleFeedComponent', () => {
  let component: SingleFeedComponent;
  let fixture: ComponentFixture<SingleFeedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
      declarations: [SingleFeedComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
