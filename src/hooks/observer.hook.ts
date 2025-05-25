/*
 * @example
 * const [search$, setSearch$] = useSubject<string>();
 * const search = useObservable(search$.pipe(debounceTime(300), filter(query => !query || query.length >= 3 || query.length === 0), distinctUntilChanged()), '');
 */

import { type MutableRefObject, useEffect, useRef } from 'react';
import { type Observable, Subject, type Subscription } from 'rxjs';

const useSubscribeTo = <T, E>(
  observable: Observable<T>,
  next?: (value: T) => void,
  error?: (err: E) => void,
  complete?: () => void,
): Subscription => {
  const subscription = observable.subscribe({ complete, error, next });

  // biome-ignore lint/correctness/useExhaustiveDependencies: -
  useEffect(() => () => subscription.unsubscribe(), []);

  return subscription;
};

export const useSubscription = <T, E>(
  observable: Observable<T>,
  next?: (value: T) => void,
  error?: (err: E) => void,
  complete?: () => void,
): Subscription => useSubscribeTo(observable, next, error, complete);

export const useObservable = <T>(observable: Observable<T>, defaultValue?: T): MutableRefObject<T> => {
  const handler = useRef(defaultValue) as MutableRefObject<T>;

  useSubscribeTo(
    observable,
    (value) => {
      handler.current = value;
    },
    (error) => {
      throw error;
    },
  );

  return handler;
};

export const useSubject = <T>(): [Subject<T>, (value: T) => void] => {
  const subject = new Subject<T>();
  const set = (value: T) => {
    subject.next(value);
  };

  return [subject, set];
};
