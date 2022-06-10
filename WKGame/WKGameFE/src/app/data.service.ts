import { Injectable, OnDestroy } from '@angular/core';
import { Observable, timer, Subscription, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap, share, retry, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class DataService implements OnDestroy {

  private idAvatar: number = 1;

  private level$: Observable<Number>;
  private score$: Observable<Number>;

  private stopPolling = new Subject();

  constructor(private http: HttpClient) {    
    this.level$ = timer(1, 3000).pipe(
      switchMap(() => http.get<Number>(`${environment.api_url}/getAvatarLevel/${this.idAvatar}`)),
      retry()
    );

    this.score$ = timer(1, 3000).pipe(
      switchMap(() => http.get<Number>(`${environment.api_url}/getAvatarScore/${this.idAvatar}`)),
      retry()
    );
  }


  getCyclicScore(): [level: Observable<Number>, score: Observable<Number>] {
    var level = this.level$.pipe(   
      tap(() => {})
    );

    var score = this.score$.pipe(   
      tap(() => {})
    );

    return [level, score];
  }

  ngOnDestroy() {
      this.stopPolling.next(0);
  }
}