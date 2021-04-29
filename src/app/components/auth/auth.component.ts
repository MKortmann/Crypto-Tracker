import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  env = environment.auth.redirect;

  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}
