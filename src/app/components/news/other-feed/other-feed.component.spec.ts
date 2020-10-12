import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherFeedComponent } from './other-feed.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('OtherFeedComponent', () => {
  let component: OtherFeedComponent;
  let fixture: ComponentFixture<OtherFeedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
      declarations: [OtherFeedComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
