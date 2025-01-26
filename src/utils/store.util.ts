import { Logger } from '@/utils/logger.util.ts';
import { setStorageItem } from '@/utils/storage.util.ts';
import { clone } from '@/utils/toolbox.util.ts';
import { useStore } from '@nanostores/react';
import type { MapStore, Store, StoreValue } from 'nanostores';

type NanoStore<State, Actions, Getters> = {
  state: State;
  actions: Actions;
  getters?: Getters;
};

export const createStore = <
  State extends MapStore,
  Actions extends { [K in keyof Actions]: Actions[K] },
  Getters extends { [K in keyof Getters]: Getters[K] },
>(
  name: string,
  store: NanoStore<State, Actions, Getters>,
) => {
  store.state.subscribe((curr, prev) => {
    Logger.groupCollapsed(name, 'NANOSTORE');
    Logger.debug('PREV_STATE', clone(prev));
    Logger.debug('CURR_STATE', clone(curr));
    Logger.groupEnd();

    setStorageItem(name, curr);
  });

  return store;
};

export const createReactStore =
  <
    State extends MapStore,
    Actions extends { [K in keyof Actions]: Actions[K] },
    Getters extends { [K in keyof Getters]: Getters[K] },
  >(
    store: NanoStore<State, Actions, Getters>,
  ) =>
  () => ({
    state: useStore(store.state),
    getters: Object.entries(store.getters ?? {}).reduce(
      (acc, [key, val]) => {
        acc[key as keyof Getters] = useStore(val as Store);
        return acc;
      },
      {} as { [K in keyof Getters]: StoreValue<Getters[K]> },
    ),
    actions: store.actions,
  });
