import { NotificationSchema } from '@/entities/notification/notification.type';
import { uuid } from '@/utils/toolbox.util';
import { atom, RecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

export type State = Readonly<{
  queue: string[];
  entities: Record<string, NotificationSchema>;
}>;

export type NotificationPayload = NotificationSchema;

export const name = 'notifications' as const;

export const initialState: State = {
  queue: [],
  entities: {}
};

export const notificationState: RecoilState<State> = atom({
  key: 'notificationState',
  default: initialState
});

export const useNotifier = () => {
  const resetState = useResetRecoilState(notificationState);
  const setState = useSetRecoilState(notificationState);

  const add = (payload: NotificationSchema) => {
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

  const next = () => {
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

  const reset = () => resetState();

  return {
    add,
    next,
    reset
  };
};
