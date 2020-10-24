import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicDashboardFinancialComponent } from './graphic-dashboard-financial.component';

describe('GraphicDashboardFinancialComponent', () => {
  let component: GraphicDashboardFinancialComponent;
  let fixture: ComponentFixture<GraphicDashboardFinancialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraphicDashboardFinancialComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicDashboardFinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
