import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicDashboardComponent } from './graphic-dashboard.component';

describe('DashboardComponent', () => {
  let component: GraphicDashboardComponent;
  let fixture: ComponentFixture<GraphicDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GraphicDashboardComponent],
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
