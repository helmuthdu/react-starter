import { useRef } from 'react';

export const usePromise = <T>(fn: (...args: any) => Promise<T>, defaultValue: T = null as any) => {
  const data = useRef<T>(defaultValue);
  const loading = useRef(false);
  const error = useRef<unknown>(null);
  const run = async (...args: any) => {
    loading.current = true;
    error.current = null;
    data.current = defaultValue;
    try {
      data.current = await fn(...args);
    } catch (err) {
      error.current = err;
    } finally {
      loading.current = false;
    }
  };
  return { data, loading, error, run };
};
