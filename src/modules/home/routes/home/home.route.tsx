import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useStorage } from '../../../../hooks/storage.hook';
import { useWorker } from '../../../../hooks/worker.hook';
import { Logger } from '../../../../utils/logger.util';
import { Home } from '../../components/home/home';

const resolve = (val: number): number => {
  const fib = (i: number): number => (i <= 1 ? i : fib(i - 1) + fib(i - 2));

  return fib(val);
};

export const HomeRoute = () => {
  const navigate = useNavigate();

  const [message, postMessage] = useWorker('W1', resolve, 0);
  const [, setStorage] = useStorage('fibonacci', message);

  // biome-ignore lint/correctness/useExhaustiveDependencies: -
  useEffect(() => {
    postMessage(43);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: -
  useEffect(() => {
    Logger.info('[WORKER] result:', message);

    if (message > 0) {
      Logger.success('[WORKER] it worked!');
    } else {
      Logger.warn('[WORKER] engine is getting started');
      Logger.trace('what happened here', { message });
    }
    setStorage(message);
  }, [message]);

  return <Home onLinkClick={navigate} />;
};

export default HomeRoute;
