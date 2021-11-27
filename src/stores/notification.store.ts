import { NotificationType } from '@/models/notification/notification.type';
import { generateUniqueId } from '@/utils/security.util';
import { atom, RecoilState } from 'recoil';

export type State = Readonly<{
  queue: string[];
  entities: Record<string, NotificationType>;
}>;

export type NotificationPayload = NotificationType;

export const name = 'notifications';

export const initialState: State = {
  queue: [],
  entities: {}
};

export const notificationState: RecoilState<State> = atom({
  key: 'notificationState',
  default: initialState
});

export const addNotificationAction = (payload: NotificationType, setState: (state: (s: State) => State) => void) => {
  const id = generateUniqueId();
  setState(state => ({
    queue: [...state.queue, id],
    entities: {
      ...state.entities,
      [id]: {
        ...payload,
        read: false,
        timeout: payload.timeout || 5000
      }
    }
  }));
};

export const actionClearNotifications = (setState: (state: State) => void) => {
  setState(initialState);
};

export const actionNextNotification = (setState: (state: (s: State) => State) => void) => {
  setState(state => ({
    queue: state.queue.slice(1),
    entities: {
      ...state.entities,
      [state.queue[0]]: {
        ...state.entities[state.queue[0]],
        read: true
      }
    }
  }));
};
