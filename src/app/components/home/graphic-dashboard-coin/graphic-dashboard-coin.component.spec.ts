import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicDashboardCoinComponent } from './graphic-dashboard-coin.component';

describe('GraphicDashboardCoinComponent', () => {
  let component: GraphicDashboardCoinComponent;
  let fixture: ComponentFixture<GraphicDashboardCoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicDashboardCoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicDashboardCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
