import { useStore } from '@/stores';
import { useCallback, useEffect, useRef, useState } from 'react';

export const AppNotification = () => {
  const {
    notifications: {
      state: { data, queue },
      actions: { next },
    },
  } = useStore();

  const [show, setShow] = useState<boolean>(true);
  const timeout = useRef<ReturnType<typeof setTimeout>>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: -
  const showNotification = useCallback(() => {
    setShow(true);

    const getNextMessage = () => {
      setShow(false);
      next();
      timeout.current = null;
    };

    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(getNextMessage, data[queue[0]].timeout);
  }, [data]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: -
  useEffect(() => {
    if (queue.length > 0) {
      showNotification();
    }
  }, [data]);

  if (queue.length === 0) {
    return null;
  }

  return <div>{show && data[queue[0]].message}</div>;
};
