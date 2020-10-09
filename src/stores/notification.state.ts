import { atom, RecoilState } from 'recoil';
import { NotificationSchema } from '../models/notification/notification.interface';

type NotificationState = NotificationSchema[];

export const notificationState: RecoilState<NotificationSchema[]> = atom({
  key: 'notificationState',
  default: [] as NotificationSchema[]
});

export const notificationAddMessage = (
  payload: NotificationSchema,
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
