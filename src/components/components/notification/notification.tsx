import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { notificationNextMessage, notificationState } from '../../../stores/notification.state';

export const Notification = () => {
  const [notifications, setNotifications] = useRecoilState(notificationState);
  const [open, setOpen] = useState<boolean>(true);
  const timeout = useRef<any>();

  const handleClose = useCallback(() => {
    setOpen(false);

    const getNextMessage = () => {
      notificationNextMessage(setNotifications);
      setOpen(true);
      timeout.current = undefined;
    };

    if (notifications.length >= 1) {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(getNextMessage, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications]);

  useEffect(() => {
    if (notifications.length > 0) setTimeout(handleClose, (notifications[0].timeout as number) * notifications.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications]);

  if (notifications.length === 0) {
    return null;
  }

  return <div>{open && notifications[0].message}</div>;
};
