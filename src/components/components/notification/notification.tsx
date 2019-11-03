import React, { useEffect, Fragment } from 'react';
import { useStore } from '../../../contexts/store/store.context';
import { actionDeleteNotification } from '../../../stores/notification';

type Props = {
  children?: React.ReactNode;
};
export const Notification = ({ children }: Props) => {
  const [{ notification }, dispatch] = useStore();

  useEffect(() => {
    if (notification.message) {
      setTimeout(() => dispatch(actionDeleteNotification()), notification.timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  return (
    <Fragment>
      {children}
      {notification.message}
    </Fragment>
  );
};
