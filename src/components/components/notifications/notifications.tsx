import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from '../../../stores';
import {
  notificationsQueueSelector,
  notificationsSelector,
  showNextNotificationAction
} from '../../../stores/modules/notifications.store';

export const Notification = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(notificationsSelector);
  const queue = useSelector(notificationsQueueSelector);
  const [show, setShow] = useState<boolean>(true);
  const timeout = useRef<any>();

  const showNotification = useCallback(() => {
    setShow(true);

    const getNextMessage = () => {
      setShow(false);
      dispatch(showNextNotificationAction());
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
