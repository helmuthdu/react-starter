import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useStore } from '../../../contexts/store/store.context';
import { actionNextNotification } from '../../../stores/notification';

export const Notification = () => {
  const [{ notification }, dispatch] = useStore();
  const [open, setOpen] = useState<boolean>(true);

  const handleClose = useCallback(() => {
    setOpen(false);

    if (notification.length >= 1) {
      setTimeout(() => {
        dispatch(actionNextNotification());
        setOpen(true);
      }, 300);
    }
  }, [dispatch, notification]);

  useEffect(() => {
    if (notification.length > 0) setTimeout(handleClose, notification[0].timeout);
  }, [notification, handleClose]);

  if (notification.length === 0) {
    return null;
  }

  return <Fragment>{open && notification[0].message}</Fragment>;
};
