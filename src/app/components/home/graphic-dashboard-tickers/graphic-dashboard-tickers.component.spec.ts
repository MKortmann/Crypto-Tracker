import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicDashboardTickersComponent } from './graphic-dashboard-tickers.component';

describe('GraphicDashboardTickersComponent', () => {
  let component: GraphicDashboardTickersComponent;
  let fixture: ComponentFixture<GraphicDashboardTickersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicDashboardTickersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicDashboardTickersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
