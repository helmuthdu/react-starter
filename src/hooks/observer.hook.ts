/*
 * @example
 * const { subject: search$, callback: setSearch$ } = useSubject<string>();
 * const search = useObservable(search$.pipe(debounceTime(300), filter(query => !query || query.length >= 3 || query.length === 0), distinctUntilChanged()), '');
 */

import { useEffect, useRef } from 'react';
import { Observable, Subject, Subscription } from 'rxjs';

const useSubscribeTo = <T>(
  observable: Observable<T>,
  next?: (value: T) => void,
  error?: (err: any) => void,
  complete?: () => void
): Subscription => {
  const subscription = observable.subscribe(next, error, complete);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => subscription.unsubscribe(), []);
  return subscription;
};

export const useObservable = <T>(observable: Observable<T>, defaultValue?: T) => {
  const handler = useRef(defaultValue);
  useSubscribeTo(
    observable,
    value => {
      handler.current = value;
    },
    error => {
      throw error;
    }
  );

  return handler;
};

export const useSubscription = <T>(
  observable: Observable<T>,
  next?: (value: T) => void,
  error?: (err: any) => void,
  complete?: () => void
): Subscription => useSubscribeTo(observable, next, error, complete);

export const useSubject = <T>(): { subject: Subject<T>; callback: (value: T) => void } => {
  const subject = new Subject<T>();
  return {
    subject,
    callback: (value: T) => {
      subject.next(value);
    }
  };
};