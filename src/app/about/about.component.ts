import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  concat,
  fromEvent,
  interval,
  noop,
  observable,
  Observable,
  of,
  timer,
  merge,
  Subject,
  BehaviorSubject,
  AsyncSubject,
  ReplaySubject
} from 'rxjs';
import {delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


/**
 * ConcatMap waits for prev observable finished its sequence
 * MergeMap doesnt waits for prev observable finished its parallel
 * ExhaustMap subscribe only if prev finsihed
 * SwitchMap if some emits it will unsubscribe prev and subscribe to fresh(new)
 */

/**
 * debounce - will fire with timer after input finished (uses the latest emitted value)
 * throttle - will fire after interval but does not guaranties that input finished
 */

/**
 * of - return amount of values in a sequence (creates observable)
 * from - turn an array, promise, or iterable into an single observable - (creates observable)
 * startWith - inits stream with initial value
 */

/**
 * forkJoin - when all observables complete, emit the last emmited value from each
 * combineLatest - When any observable emits a value, emits the latest value from each
 */

/**
 * - Plain Subject - has no memory
 * - BehaviourSubject - has memory, it should has initial value and
 * its guarantee that all subscribers will recieve latest value from emitted earlier
 * - AsyncSubject subscribers will recieve only last emitted value
 * - ReplaySubjectg - subjectgs will recieves all emited values event without observable complete
 */

/**
 * first - emits only first value
 * take - take value of selected number
 */

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  http$: Observable<any>
  courses$: Observable<any>

  createSubject(): void {
    const subject = new Subject();

    const series$ = subject.asObservable();

    series$.subscribe(console.log)

    subject.next(1)
    subject.next(2)
    subject.next(3)
    subject.complete();
  }

  createAsyncSubject(): void {
    const subject = new AsyncSubject();

    const series$ = subject.asObservable();

    series$.subscribe(console.log)

    subject.next(1)
    subject.next(2)
    subject.next(3)

    subject.complete();
  }

  createCancelableObservable(): void {
    const http$ = createHttpObservable('/api/courses')

    const sub = http$.subscribe(console.log)

    setTimeout(() => sub.unsubscribe(), 0)
  }

  createConcatObservable(): void {
    const source1$ = of(1, 2, 3);

    const source2$ = of(4, 5, 6)

    const source3$ = of(7, 8, 9)

    const result$ = concat(source1$, source2$, source3$);

    result$.subscribe(value => console.log('concat', value))
  }

  createMergeObservable(): void {
    const interval1$ = interval(1000)

    const interval2$ = interval1$.pipe(map(value => value * 10))

    const result$ = merge(interval1$, interval2$)

    result$.subscribe(value => {
      debugger;
      console.log(value)
    })
  }

  createFetchObservable(): void {
    this.http$ = createHttpObservable('/api/courses')

    this.http$.subscribe(
      response => console.log('response', response),
    noop,
    () => console.log('completed')
    )
  }

  createCoursesSubscribe(): void {
    this.courses$ = this.http$.pipe(
    map(response => response.payload)
    )

    this.courses$.subscribe(courses => console.log('courses', courses))
  }

  runInterval() {
    const interval$ = interval(1000)

    interval$.subscribe(value => console.log('Stream 1 ' +  value))
    interval$.subscribe(value => console.log('Stream 2 ' +  value))
  }

  runTimer() {
    const interval$ = timer(3000, 1000)

    const sub = interval$.subscribe(value => console.log('Stream 1 ' +  value))

    setTimeout(() => sub.unsubscribe(), 5000)
  }

  runDOMEvent() {
    const click$ = fromEvent(document, 'click')

    click$.subscribe(
    event => console.log(event),
    error => console.log('error from click stream'),
    () => console.log('click stream completed')
    )
  }


  ngOnInit() {
    this.createAsyncSubject();

    // this.createSubject();

    // this.runTimer();
    //
    // this.runDOMEvent();
    //
    // this.createFetchObservable();
    //
    // this.createCoursesSubscribe();

    // this.createConcatObservable()

    // this.createMergeObservable()

    // this.createCancelableObservable()
  }


}






