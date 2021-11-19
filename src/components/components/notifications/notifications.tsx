import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { actionNextNotification, notificationState } from '../../../stores/notification.store';

export const Notification = () => {
  const [{ entities: notifications, queue }, setNotification] = useRecoilState(notificationState);
  const [show, setShow] = useState<boolean>(true);
  const timeout = useRef<any>();

  const showNotification = useCallback(() => {
    setShow(true);

    const getNextMessage = () => {
      setShow(false);
      actionNextNotification(setNotification);
      timeout.current = undefined;
    };

    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(getNextMessage, notifications[queue[0]].timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications]);

  useEffect(() => {
    if (queue.length > 0) {
      showNotification();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications]);

  if (queue.length === 0) {
    return null;
  }

  return <div>{show && notifications[queue[0]].message}</div>;
};
