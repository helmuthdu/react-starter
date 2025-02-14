import type { MessageJSON } from '@/models/notification/notification.type';
import { createReactStore, createStore } from '@/utils/store.util';
import { uuid } from '@/utils/toolbox.util';
import { map } from 'nanostores';

export type State = Readonly<{
  queue: string[];
  data: Record<string, MessageJSON>;
}>;

export const name = 'notifications' as const;

export const initialState: State = {
  queue: [],
  data: {},
};

export const state = map<State>(initialState);

const actions = {
  add: (payload: MessageJSON) => {
    const id = uuid();
    const currentState = state.get();

    state.set({
      queue: [...currentState.queue, id],
      data: {
        ...currentState.data,
        [id]: {
          ...payload,
          read: false,
          timeout: payload.timeout || 5000,
        },
      },
    });
  },
  next: () => {
    const currentState = state.get();
    state.set({
      queue: currentState.queue.slice(1),
      data: {
        ...currentState.data,
        [currentState.queue[0]]: {
          ...currentState.data[currentState.queue[0]],
          read: true,
        },
      },
    });
  },
  reset: () => state.set(initialState),
};

export const notificationStore = createStore(name, { state, actions });

export const useNotificationStore = createReactStore({ state, actions });
