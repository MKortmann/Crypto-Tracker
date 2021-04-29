import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

// import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private translate: TranslateService, public auth: AuthService) {
    auth.loginWithRedirect();
  }

  ngOnInit(): void {}
}
