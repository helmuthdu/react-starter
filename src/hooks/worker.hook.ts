/*
 * @example
 * const resolve = (val: number): number => {
 *   const fib = (i: number): number => (i <= 1 ? i : fib(i - 1) + fib(i - 2));
 *   return fib(val);
 * };
 * const [value, calc] = useWorkerFromScript(resolve);
 */

import { useEffect, useRef, useState } from 'react';
import { Logger } from '../utils';

type UseWorker<T> = [T, (data: any) => void];

const workers: Record<string, { terminate: () => void }> = {};

const useWorker = <T>(opts: { id: string; url?: string; worker?: Worker; code?: boolean }): UseWorker<T> => {
  const worker = useRef<Worker>();
  const [message, setMessage] = useState<T>();

  const onMessage = (evt: MessageEvent) => {
    setMessage(evt.data);
  };

  const onError = (evt: ErrorEvent) => {
    Logger.error('[WORKER] Message Failed', evt);
  };

  const createWorker = () => {
    if (opts.worker) {
      worker.current = opts.worker;
    } else if (opts.url) {
      worker.current = new Worker(opts.url);
    }
    workers[opts.id] = { terminate: terminateWorker };
  };

  const setupWorker = () => {
    createWorker();
    if (worker.current) {
      worker.current.onmessage = onMessage;
      worker.current.onerror = onError;
    } else {
      Logger.error('[WORKER] Missing url or worker');
    }
  };

  const terminateWorker = () => {
    if (worker.current) {
      if (!opts.worker) {
        worker.current.terminate();
      }
      worker.current = undefined;
    }
    if (opts.code && opts.url) {
      window.URL.revokeObjectURL(opts.url);
    }
    delete workers[opts.id];
  };

  const postMessage = (data: any) => {
    Logger.info('[WORKER] Post Message', data);
    if (worker.current) {
      worker.current.postMessage(data);
    } else {
      Logger.error('[WORKER] Worker not found');
    }
  };

  setupWorker();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => terminateWorker(), []);

  return [message as T, postMessage];
};

const generateId = (url: string) => {
  const id = window.btoa(url);
  // Remove old worker
  workers[id]?.terminate();
  return id;
};

export const useWorkerFromUrl = <T>(url: string): UseWorker<T> => useWorker({ id: generateId(url), url });

export const useWorkerFromCode = <T>(resolve: (data: any) => T): UseWorker<T> => {
  const resolveString = resolve.toString();
  const webWorkerTemplate = `self.onmessage = function(e) { self.postMessage((${resolveString})(e.data)); }`;
  const blob = new Blob([webWorkerTemplate], { type: 'text/javascript' });
  const url = window.URL.createObjectURL(blob);

  return useWorker<T>({ id: generateId(resolveString), url, code: true });
};

export const useWorkerFromWorker = <T>(id: string, worker: Worker): UseWorker<T> => useWorker<T>({ id, worker });
