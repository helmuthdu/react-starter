// @flow
import React from 'react';
import { fromEvent, Observable, SchedulerLike } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, pluck, startWith } from 'rxjs/operators';

interface SearchObservableOptions {
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
export const createObservableFromInput = (
  refObject: React.RefObject<HTMLInputElement>,
  options: SearchObservableOptions
): Observable<string> => {
  const { time = 400, scheduler, minLength = 3 } = options;
  return fromEvent(refObject.current, 'input').pipe(
    pluck<HTMLInputElement, string>('target', 'value'),
    debounceTime(time, scheduler),
    filter(query => query.length >= minLength || query.length === 0),
    distinctUntilChanged(),
    startWith('')
  );
};
