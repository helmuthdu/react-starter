import React from 'react';
import { fromEvent, Observable, SchedulerLike } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, pluck } from 'rxjs/operators';

interface InputObservableOptions {
  time?: number;
  scheduler?: SchedulerLike;
  minLength?: number;
}
/**
 * Creates an observable variable to be used with a search input
 * @param refObject
 * @param options
 * @return Observable<string>
 */
export const createSearchInputObservable = (
  refObject: React.RefObject<HTMLInputElement>,
  options: InputObservableOptions
): Observable<string> => {
  const { time = 400, scheduler, minLength = 3 } = options;
  return fromEvent(refObject.current as HTMLInputElement, 'input').pipe(
    pluck<Event, string>('target', 'value'),
    debounceTime(time, scheduler),
    filter(query => query.length >= minLength || query.length === 0),
    distinctUntilChanged()
  );
};
