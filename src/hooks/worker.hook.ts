/*
 * @example
 * const resolve = (val: number): number => {
 *   const fib = (i: number): number => (i <= 1 ? i : fib(i - 1) + fib(i - 2));
 *   return fib(val);
 * };
 * const [value, calc] = useWorker('w1', resolve, 0);
 */

import { useEffect, useRef, useState } from 'react';
import { Logger } from '../utils';

type UseWorker<T> = [T, (data: any) => void];

const workers = new Map<string | number, Worker>();

const useWorkerInit = <T>(opts: {
  code?: boolean;
  defaultValue?: T;
  id: string | number;
  terminate?: boolean;
  url?: string;
  worker?: Worker;
}): UseWorker<T> => {
  const worker = useRef<Worker>();
  const [message, setMessage] = useState<T>(() => opts.defaultValue as T);

  const onMessage = (evt: MessageEvent) => {
    setMessage(evt.data);
  };

  const onError = (evt: ErrorEvent) => {
    Logger.error(`[WORKER|${opts.id}] Message Failed`, evt);
  };

  const createWorker = () => {
    if (workers.has(opts.id)) {
      worker.current = workers.get(opts.id);
    } else if (opts.worker) {
      worker.current = opts.worker;
    } else if (opts.url) {
      worker.current = new Worker(opts.url);
    }
    workers.set(opts.id, worker.current as Worker);
  };

  const setupWorker = () => {
    createWorker();
    if (worker.current) {
      worker.current.addEventListener('message', onMessage, false);
      worker.current.addEventListener('error', onError, false);
    } else {
      Logger.error(`[WORKER|${opts.id}] Missing id, url or worker`);
    }
  };

  const terminateWorker = () => {
    Logger.info(`[WORKER|${opts.id}] Terminate`);
    if (worker.current) {
      worker.current.removeEventListener('message', onMessage);
      worker.current.removeEventListener('error', onError);
      if (!opts.terminate) {
        worker.current.terminate();
      }
      worker.current = undefined;
    }
    if (opts.code && opts.url) {
      window.URL.revokeObjectURL(opts.url);
    }
    workers.delete(opts.id);
  };

  const postMessage = (data: any) => {
    Logger.info(`[WORKER|${opts.id}] Post Message`, data);
    if (worker.current) {
      worker.current.postMessage(data);
    } else {
      Logger.error(`[WORKER|${opts.id}] Not found`);
    }
  };

  setupWorker();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => terminateWorker(), []);

  return [message as T, postMessage];
};

export const useWorker = <T>(id: string, resolve: (data: any) => T, defaultValue?: T): UseWorker<T> => {
  const resolveString = resolve.toString();
  const webWorkerTemplate = `self.onmessage = function(e) { self.postMessage((${resolveString})(e.data)); }`;
  const blob = new Blob([webWorkerTemplate], { type: 'text/javascript' });
  const url = window.URL.createObjectURL(blob);

  return useWorkerInit<T>({ code: true, defaultValue, id, terminate: true, url });
};

export const useWorkerFromUrl = <T>(id: string, url: string, defaultValue?: T): UseWorker<T> =>
  useWorkerInit({ defaultValue, id, terminate: true, url });

export const useWorkerFromWorker = <T>(id: string, worker: Worker, defaultValue?: T): UseWorker<T> =>
  useWorkerInit<T>({ defaultValue, id, worker });
