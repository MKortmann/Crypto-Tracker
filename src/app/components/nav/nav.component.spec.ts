import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, OnInit } from '@angular/core';

import { NavComponent } from './nav.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [TranslateService],
      declarations: [NavComponent],
      // schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
