import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, pluck } from 'rxjs/operators';

/**
 * Creates an observable variable to be used with a search input
 * @param refObject
 * @param options
 * @return Observable<string>
 */
export const createObservableFromInput = (refObject, options) => {
  const { time = 400, scheduler, minLength = 3 } = options;
  return fromEvent(refObject.current, 'input').pipe(
    pluck('target', 'value'),
    debounceTime(time, scheduler),
    filter(query => query.length >= minLength || query.length === 0),
    distinctUntilChanged()
  );
};
