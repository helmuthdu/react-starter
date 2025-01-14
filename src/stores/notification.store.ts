import type { MessageJSON } from '@/models/notification/notification.type';
import { Logger } from '@/utils/logger.util';
import { clone, diff, uuid } from '@/utils/toolbox.util';
import { useStore as asRef } from '@nanostores/react';
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

state.subscribe((curr, prev) => {
  Logger.groupCollapsed(name, 'NANOSTORE');
  Logger.debug('PREV_STATE', clone(prev));
  Logger.debug('CURR_STATE', clone(curr));
  Logger.debug('STATE_DIFF', diff(curr, prev));
  Logger.groupEnd();
});

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

export const store = {
  notifications: state,
  ...actions,
};

export const useNotificationStore = () => ({
  notifications: asRef(state),
  ...actions,
});
