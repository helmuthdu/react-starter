import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useStore } from '../../../stores';
import { actionNextNotification } from '../../../stores/notification';

export const Notification = () => {
  const [{ notification }, dispatch] = useStore();
  const [open, setOpen] = useState<boolean>(true);
  const timeout = useRef<any>();

  const handleClose = useCallback(() => {
    setOpen(false);

    const getNextMessage = () => {
      dispatch(actionNextNotification());
      setOpen(true);
      timeout.current = undefined;
    };

    if (notification.length >= 1) {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(getNextMessage, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  useEffect(() => {
    if (notification.length > 0) setTimeout(handleClose, (notification[0].timeout as number) * notification.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  if (notification.length === 0) {
    return null;
  }

  return <div>{open && notification[0].message}</div>;
};
