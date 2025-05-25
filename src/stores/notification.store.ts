import { map } from 'nanostores';
import type { MessageJSON } from '../models/notification/notification.type';
import { uuid } from '../utils';
import { createReactStore, createStore } from '../utils/store.util';

export type State = Readonly<{
  queue: string[];
  data: Record<string, MessageJSON>;
}>;

export const name = 'notifications' as const;

export const initialState: State = {
  data: {},
  queue: [],
};

export const state = map<State>(initialState);

const actions = {
  add: (payload: MessageJSON) => {
    const id = uuid();
    const currentState = state.get();

    state.set({
      data: {
        ...currentState.data,
        [id]: {
          ...payload,
          read: false,
          timeout: payload.timeout || 5000,
        },
      },
      queue: [...currentState.queue, id],
    });
  },
  next: () => {
    const currentState = state.get();
    state.set({
      data: {
        ...currentState.data,
        [currentState.queue[0]]: {
          ...currentState.data[currentState.queue[0]],
          read: true,
        },
      },
      queue: currentState.queue.slice(1),
    });
  },
  reset: () => state.set(initialState),
};

export const notificationStore = createStore(name, { actions, state });

export const useNotificationStore = createReactStore({ actions, state });
