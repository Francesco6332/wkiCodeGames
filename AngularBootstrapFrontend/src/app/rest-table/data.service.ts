import { Injectable, OnDestroy } from '@angular/core';
import { Observable, timer, Subscription, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap, share, retry, takeUntil } from 'rxjs/operators';

@Injectable()
export class DataService implements OnDestroy {

  private score$: Observable<Number>;

  private stopPolling = new Subject();

  constructor(private http: HttpClient) {    
    this.score$ = timer(1, 3000).pipe(
      switchMap(() => http.get<Number>('/getScore')),
      retry()
    );
  }


  getCyclicScore(): Observable<Number> {
    return this.score$.pipe(   
      tap(() => console.log('data sent to subscriber'))
    );
  }

  ngOnDestroy() {
      this.stopPolling.next(0);
  }
}