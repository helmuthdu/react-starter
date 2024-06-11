import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { notificationState, useNotifier } from '../../../stores/notification.store';

export const Notification = () => {
  const { data: notifications, queue } = useRecoilValue(notificationState);
  const notifier = useNotifier();

  const [show, setShow] = useState<boolean>(true);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const timeout = useRef<any>();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const showNotification = useCallback(() => {
    setShow(true);

    const getNextMessage = () => {
      setShow(false);
      notifier.next();
      timeout.current = undefined;
    };

    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(getNextMessage, notifications[queue[0]].timeout);
  }, [notifications]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (queue.length > 0) {
      showNotification();
    }
  }, [notifications]);

  if (queue.length === 0) {
    return null;
  }

  return <div>{show && notifications[queue[0]].message}</div>;
};
