import { atom, RecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { NotificationSchema } from '../entities/notification/notification.type';
import { uuid } from '../utils/misc.util';

export type State = Readonly<{
  queue: string[];
  entities: Record<string, NotificationSchema>;
}>;

export type NotificationPayload = NotificationSchema;

export const name = 'notifications';

export const initialState: State = {
  queue: [],
  entities: {}
};

export const notificationState: RecoilState<State> = atom({
  key: 'notificationState',
  default: initialState
});

export const useAddNotification = () => {
  const setState = useSetRecoilState(notificationState);
  return (payload: NotificationSchema) => {
    const id = uuid();
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
};

export const useResetNotifications = () => {
  const resetState = useResetRecoilState(notificationState);
  return () => resetState();
};

export const useShowNextNotification = () => {
  const setState = useSetRecoilState(notificationState);
  return () => {
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
};
