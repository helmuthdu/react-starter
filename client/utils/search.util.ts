import { Observable, SchedulerLike, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

interface InputObservableOptions {
  time?: number;
  scheduler?: SchedulerLike;
  minLength?: number;
}

export const debounceValueObservable = (
  subject: Subject<string>,
  options: InputObservableOptions = {}
): Observable<string> => {
  const { time = 400, scheduler, minLength = 3 } = options;
  return subject.pipe(
    debounceTime(time, scheduler),
    filter(query => query.length >= minLength || query.length === 0),
    distinctUntilChanged()
  );
};
