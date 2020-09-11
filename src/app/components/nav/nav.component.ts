import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  darkMode = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private translate: TranslateService,
    private routeLinkActive: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  // this would allow us to load the theme at runtime, based on users preferences
  loadStyle(styleName: string = 'dark') {
    if (this.darkMode === false) {
      this.darkMode = true;
      styleName = 'dark';
    } else {
      this.darkMode = false;
      styleName = 'light';
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
