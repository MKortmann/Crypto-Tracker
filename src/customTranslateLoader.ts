import { en } from './assets/i18n/en';
import { de } from './assets/i18n/de';
import { pt } from './assets/i18n/pt';

import { Observable } from 'rxjs';

import { TranslateLoader } from '@ngx-translate/core';

export class CustomTranslateLoader implements TranslateLoader {
  // Gets an object of translation for a give language with the current loader
  public getTranslation(lang: string): Observable<any> {
    return Observable.create((observer) => {
      switch (lang) {
        case 'pt':
          observer.next(pt);
          break;
        case 'en':
          observer.next(en);
          break;
        case 'de':
          observer.next(de);
          break;
        default:
          observer.next(en);
          break;
      }
      observer.complete();
    });
  }
}
