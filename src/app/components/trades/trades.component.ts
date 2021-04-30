import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss'],
})
export class TradesComponent implements OnInit {
  message: string = null;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.callAPI();
  }

  callAPI(): void {
    const msg = this.http
      .get(`${environment.ctBackend.url}`)
      .subscribe((res) => {
        console.log(res);
        debugger;
      });
  }
}
