import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { SwUpdate } from '@angular/service-worker';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AuthService } from '@auth0/auth0-angular';

describe('AppComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          TranslateModule.forRoot(),
          ServiceWorkerModule.register('ngsw-worker.js'),
        ],
        providers: [TranslateService, SwUpdate, AuthService],
        declarations: [AppComponent],
      }).compileComponents();
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
