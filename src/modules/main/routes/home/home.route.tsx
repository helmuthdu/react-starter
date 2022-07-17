import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useStorage } from '../../../../hooks/storage.hook';
import { useWorker } from '../../../../hooks/worker.hook';
import { Logger } from '../../../../utils';
import { Home } from '../../components/home/home';

const resolve = (val: number): number => {
  const fib = (i: number): number => (i <= 1 ? i : fib(i - 1) + fib(i - 2));
  return fib(val);
};

export const HomeRoute = () => {
  const navigate = useNavigate();

  const [message, postMessage] = useWorker('W1', resolve, 0);
  const [, setStorage] = useStorage('fibonacci', message);

  useEffect(() => {
    postMessage(43);
  }, []);

  useEffect(() => {
    Logger.info('[WORKER] result:', message);
    setStorage(message);
  }, [message]);

  return <Home onLinkClick={navigate} />;
};

export default HomeRoute;
