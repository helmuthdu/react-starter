import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

/**
 * Creates an observable variable to be used with a search input
 * @param subject
 * @param options
 * @return Observable<string>
 */
export const createSearchInputFromObservable = (subject, options) => {
  const { time = 400, scheduler, minLength = 3 } = options;
  return subject.pipe(
    debounceTime(time, scheduler),
    filter(query => query.length >= minLength || query.length === 0),
    distinctUntilChanged()
  );
};
