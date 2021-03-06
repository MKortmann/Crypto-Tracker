import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

// // import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(100),
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class NavComponent implements OnInit {
  public isShown = false;

  constructor(private translate: TranslateService, public auth: AuthService) {}

  ngOnInit(): void {}

  showHideSideNav(showHide: boolean) {
    this.isShown = showHide;
  }
}
