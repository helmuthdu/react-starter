import { useCallback, useEffect, useRef, useState } from 'react';
import { useNotificationStore } from '../../../stores/notification.store';

export const Notification = () => {
  const { notifications: {data: messages, queue} } = useNotificationStore();
  const notifier = useNotificationStore();

  const [show, setShow] = useState<boolean>(true);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const timeout = useRef<any>();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const showNotification = useCallback(() => {
    setShow(true);

    const getNextMessage = () => {
      setShow(false);
      notifier.next();
      timeout.current = undefined;
    };

    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(getNextMessage, messages[queue[0]].timeout);
  }, [messages]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (queue.length > 0) {
      showNotification();
    }
  }, [messages]);

  if (queue.length === 0) {
    return null;
  }

  return <div>{show && messages[queue[0]].message}</div>;
};
