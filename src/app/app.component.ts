import { Component } from '@angular/core';

// Here we import the translate service
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    if (localStorage.getItem('language') == null) {
      this.translate.setDefaultLang('en');
    } else {
      this.translate.setDefaultLang(localStorage.getItem('language'));
    }
    this.translate.onLangChange.subscribe(
      (x) => {
        console.log('Language is changed to: ', x);
        localStorage.setItem('language', x.lang);
      },
      (error) => console.log('onLangChange failed')
    );
  }
}
