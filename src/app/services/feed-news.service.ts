import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FeedNewsService {
  constructor(private http: HttpClient) {}

  getNewsFeedsUrl(feedsUrl): Observable<any[]> {
    const prefix = 'https://api.rss2json.com/v1/api.json?rss_url=';
    const response = [];

    for (const item of feedsUrl) {
      const url = item.url;

      response.push(
        this.http.get<any>(prefix + url).pipe(
          map((res) => res),
          catchError((e) => of('Error'))
        )
      );
    }

    return forkJoin(response);
  }
}
