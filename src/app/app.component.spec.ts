import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { SwUpdate } from '@angular/service-worker';

import { ServiceWorkerModule } from '@angular/service-worker';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        ServiceWorkerModule.register('ngsw-worker.js'),
      ],
      providers: [TranslateService, SwUpdate],
      declarations: [AppComponent],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
