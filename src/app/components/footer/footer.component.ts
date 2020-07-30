import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private translate: TranslateService
  ) {
    const darkMode = localStorage.getItem('darkMode');
    // it works as a toggle, the reason the logic is reverse!
    if (darkMode === 'true') {
      this.darkMode = false;
      this.loadStyle();
    } else {
      this.darkMode = true;
      this.loadStyle();
    }
  }
  darkMode = false;

  ngOnInit(): void {}

  change(code: string) {
    this.translate.use(code);
  }

  // this would allow us to load the theme at runtime, based on users preferences
  loadStyle(styleName: string = 'dark') {
    // it works as a toggle!
    if (this.darkMode === false) {
      this.darkMode = true;
      styleName = 'dark';
      localStorage.setItem('darkMode', 'true');
    } else {
      this.darkMode = false;
      styleName = 'light';
      localStorage.setItem('darkMode', 'false');
    }
    // get the head element of the page
    const head = this.document.getElementsByTagName('head')[0];

    const themeLink = this.document.getElementById(
      'client-theme'
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = styleName + '.css';
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}.css`;
      head.appendChild(style);
    }
  }
}
