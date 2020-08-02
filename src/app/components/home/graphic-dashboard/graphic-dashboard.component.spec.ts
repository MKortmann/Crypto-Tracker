import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicDashboardComponent } from './graphic-dashboard.component';

import { HttpClient, HttpHandler } from '@angular/common/http';

import { TranslateService, TranslateModule } from '@ngx-translate/core';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('GraphicDashboardComponent', () => {
  let component: GraphicDashboardComponent;
  let fixture: ComponentFixture<GraphicDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [HttpClient, HttpHandler, TranslateService],
      declarations: [GraphicDashboardComponent],
      // schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
