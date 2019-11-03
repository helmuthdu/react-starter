import React, { createContext, useContext, useEffect } from 'react';
import { INotification } from '../../models/notification/notification.interface';
import { actionDeleteNotification } from '../../stores/notification';
import { useStore } from '../store/store.context';

type NotificationConsumer = {
  notification: INotification;
};
const NotificationContext = createContext<NotificationConsumer | undefined>(undefined);

type Props = {
  children?: React.ReactNode;
};
export const NotificationProvider = ({ children, ...props }: Props) => {
  const [{ notification }, dispatch] = useStore();

  useEffect(() => {
    setTimeout(() => dispatch(actionDeleteNotification()), notification.timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  return (
    <NotificationContext.Provider value={{ notification }} {...props}>
      {children}
      {notification.message}
    </NotificationContext.Provider>
  );
};

export const { Consumer: NotificationConsumer } = NotificationContext;

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(`useNotification must be used within a NotificationProvider`);
  }
  return context;
};
