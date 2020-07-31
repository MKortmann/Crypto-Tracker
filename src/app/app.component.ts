import { Component, Inject } from '@angular/core';

// Here we import the translate service
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: 'Crypto-Tracker';
  setLanguage = 'en';
  constructor(private translate: TranslateService) {
    if (localStorage.getItem('language') == null) {
      this.translate.setDefaultLang('en');
    } else {
      this.setLanguage = localStorage.getItem('language');
      this.translate.setDefaultLang(this.setLanguage);
    }
    this.translate.onLangChange.subscribe(
      (x) => {
        console.log('Language is changed to: ', x);
        localStorage.setItem('language', x.lang);
        this.setLanguage = x.lang;
      },
      (error) => console.log('onLangChange failed')
    );
  }
}
