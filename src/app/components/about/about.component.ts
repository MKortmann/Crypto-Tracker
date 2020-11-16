import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  latitude = 49.6800451;
  longitude = 8.6145773;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {}
}
