import { atom, RecoilState } from 'recoil';
import { Notification } from '../models/notification/notification.interface';

type NotificationState = Notification[];

export const notificationState: RecoilState<Notification[]> = atom({
  key: 'notificationState',
  default: [] as Notification[]
});

export const notificationAddMessage = (
  payload: Notification,
  setState: (state: (s: NotificationState) => NotificationState) => void
) => {
  setState(state => [
    ...state,
    {
      ...payload,
      timeout: payload.timeout || 5000
    }
  ]);
};

export const notificationClearMessages = (setState: (state: NotificationState) => void) => {
  setState([]);
};

export const notificationNextMessage = (setState: (state: (s: NotificationState) => NotificationState) => void) => {
  setState(state => [...state].slice(1));
};
