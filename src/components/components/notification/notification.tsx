import React, { Fragment, useEffect } from 'react';
import { useStore } from '../../../contexts/store/store.context';
import { actionDeleteNotification } from '../../../stores/notification';

export const Notification = () => {
  const [{ notification }, dispatch] = useStore();

  useEffect(() => {
    if (notification.message) {
      setTimeout(() => dispatch(actionDeleteNotification()), notification.timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  return <Fragment>{notification.message}</Fragment>;
};
