import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicDashboardInsideComponent } from './graphic-dashboard-inside.component';

describe('GraphicDashboardInsideComponent', () => {
  let component: GraphicDashboardInsideComponent;
  let fixture: ComponentFixture<GraphicDashboardInsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicDashboardInsideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicDashboardInsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
