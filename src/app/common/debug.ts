import {Observable, observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export enum LoggingLevel {
  TRACE,
  DEBUG,
  INFO,
  ERROR
}

let level = LoggingLevel.INFO;

export const setLoggingLevel = (levelInput: LoggingLevel) => {
  level = levelInput;
}

export const debug = ( level: number, message: string ) => {
  return (source: Observable<any>) => {
    return source.pipe(
      tap(value => {
        console.log(message,  value)
      })

    )
  }
}
