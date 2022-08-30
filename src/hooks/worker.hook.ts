/*
 * @example
 * const resolve = (val: number): number => {
 *   const fib = (i: number): number => (i <= 1 ? i : fib(i - 1) + fib(i - 2));
 *   return fib(val);
 * };
 * const { message, post } = useWorker('W1', resolve, 0);
 */

import { Ref, useEffect, useRef, useState } from 'react';
import { Logger } from '../utils';

type UseWorker<T> = [T, (message: any) => void, () => void, Ref<Worker | undefined>];
type WorkerOptions<T> = {
  defaultValue?: T;
  id: string | number;
  function?: boolean;
  terminate?: boolean;
  url?: string;
  worker?: Worker;
};

const workers = new Map<string | number, WorkerOptions<any>>();

const createWorker = <T>(opts: WorkerOptions<T>): UseWorker<T> => {
  const worker = useRef<Worker>();
  const [message, setMessage] = useState<T>(() => opts.defaultValue as T);

  const onMessage = (evt: MessageEvent) => {
    setMessage(evt.data);
  };

  const onError = (evt: ErrorEvent) => {
    Logger.error(`[WORKER|${opts.id}] Message Failed`, evt);
  };

  const setup = () => {
    if (!opts.worker && !opts.url) {
      Logger.error(`[WORKER|${opts.id}] Missing url/worker Property`);
      return;
    }
    worker.current = opts.worker ?? new Worker(opts.url as string);
    worker.current.addEventListener('message', onMessage, false);
    worker.current.addEventListener('error', onError, false);
    workers.set(opts.id, { ...opts, worker: worker.current });
  };

  const terminate = () => {
    Logger.info(`[WORKER|${opts.id}] Terminate`);
    if (worker.current) {
      worker.current.removeEventListener('message', onMessage);
      worker.current.removeEventListener('error', onError);
      if (!opts.terminate) {
        worker.current.terminate();
      }
      if (opts.function && opts.url) {
        window.URL.revokeObjectURL(opts.url);
      }
      workers.delete(opts.id);
      worker.current = undefined;
    }
  };

  const post = (data: any) => {
    Logger.info(`[WORKER|${opts.id}] Post Message`, data);
    if (worker.current) {
      worker.current.postMessage(data);
    } else {
      Logger.error(`[WORKER|${opts.id}] Not found`);
    }
  };

  setup();
  useEffect(() => () => terminate(), []);

  return [message, post, terminate, worker];
};

export const useWorker = <T>(id: string, func: (data: any) => T, defaultValue?: T): UseWorker<T> => {
  let opts: WorkerOptions<T> = { defaultValue, function: true, id, terminate: true };

  if (workers.has(id)) {
    opts = workers.get(id) as WorkerOptions<T>;
  } else {
    const resolveString = func.toString();
    const webWorkerTemplate = `self.onmessage = function(e) { self.postMessage((${resolveString})(e.data)); }`;
    const blob = new Blob([webWorkerTemplate], { type: 'text/javascript' });
    opts.url = window.URL.createObjectURL(blob);
  }

  return createWorker<T>(opts);
};

export const useWorkerFromUrl = <T>(id: string, url: string, defaultValue?: T): UseWorker<T> =>
  createWorker({ defaultValue, id, terminate: true, url });

export const useWorkerFromWorker = <T>(id: string, worker: Worker, defaultValue?: T): UseWorker<T> =>
  createWorker<T>({ defaultValue, id, worker });
