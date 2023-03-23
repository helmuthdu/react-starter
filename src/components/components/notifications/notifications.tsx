import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { notificationState, useNotifier } from '../../../stores/notification.store';

export const Notification = () => {
  const { entities: notifications, queue } = useRecoilValue(notificationState);
  const notifier = useNotifier();

  const [show, setShow] = useState<boolean>(true);
  const timeout = useRef<any>();

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
