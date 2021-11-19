import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  actionNextNotification,
  selectorNotifications,
  selectorNotificationsQueue
} from '../../../stores/modules/notifications.store';
import { useAppDispatch, useAppSelector } from '../../../stores';

export const Notification = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectorNotifications);
  const queue = useAppSelector(selectorNotificationsQueue);
  const [show, setShow] = useState<boolean>(true);
  const timeout = useRef<any>();

  const showNotification = useCallback(() => {
    setShow(true);

    const getNextMessage = () => {
      setShow(false);
      dispatch(actionNextNotification());
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
