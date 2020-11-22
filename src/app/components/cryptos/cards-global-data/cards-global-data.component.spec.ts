import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsGlobalDataComponent } from './cards-global-data.component';

import { HttpClient, HttpHandler } from '@angular/common/http';

import { TranslateService, TranslateModule } from '@ngx-translate/core';

describe('CardsGlobalValuesComponent', () => {
  let component: CardsGlobalDataComponent;
  let fixture: ComponentFixture<CardsGlobalDataComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [TranslateModule.forRoot()],
        providers: [HttpClient, HttpHandler, TranslateService],
        declarations: [CardsGlobalDataComponent],
        // schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsGlobalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
