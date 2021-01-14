import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, finalize, map, retry, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';
import {Store} from '../common/store.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;
  http$: Observable<any>
  courses$: Observable<Course[]>


  constructor(
    private store: Store
  ) {

  }

  ngOnInit() {
    /**
     * CatchError example
     */
    this.courses$ = this.store.courses$;

    this.beginnerCourses$ = this.store.selectBeginnersCourses();

    this.advancedCourses$ = this.store.selectAdvancedCourses();
  }

}
