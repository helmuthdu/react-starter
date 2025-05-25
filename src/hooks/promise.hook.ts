import { useRef } from 'react';
import { Logger } from '../utils/logger.util';

export enum PromiseStatus {
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED',
}

export const usePromise = <T>(fn: (...args: unknown[]) => Promise<T>, defaultValue?: T) => {
  const value = useRef(defaultValue);
  const status = useRef<PromiseStatus>(PromiseStatus.PENDING);
  const run = async (...args: unknown[]) => {
    try {
      status.current = PromiseStatus.PENDING;
      value.current = await fn(...args);
      status.current = PromiseStatus.RESOLVED;
    } catch (err) {
      Logger.error('usePromise -> promise failed', err);
      status.current = PromiseStatus.REJECTED;
    }
  };

  return { run, status, value };
};
