import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useWorkerFromCode } from '../../../../hooks/worker.hook';
import { Logger } from '../../../../utils';
import { Home } from '../../components/home/home';

import './home.route.scss';
import { useStorage } from '../../../../hooks/storage.hook';

const resolve = (val: number): number => {
  const fib = (i: number): number => (i <= 1 ? i : fib(i - 1) + fib(i - 2));
  return fib(val);
};

export const HomeRoute = () => {
  const { push } = useHistory();

  const [message, postMessage] = useWorkerFromCode(resolve, 0);
  const [, setStorage] = useStorage('fibonacci', message);

  useEffect(() => {
    postMessage(43);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Logger.info('[WORKER] result:', message);
    setStorage(message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return <Home onLinkClick={push} />;
};

export default HomeRoute;
