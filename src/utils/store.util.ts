import { useStore } from '@nanostores/react';
import type { MapStore, Store, StoreValue } from 'nanostores';
import { clone } from './index';
import { Logit } from './logit.util';
import { Storage } from './storage.util';

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
    Logit.groupCollapsed(name, 'NANOSTORE');
    Logit.debug('PREV_STATE', clone(prev));
    Logit.debug('CURR_STATE', clone(curr));
    Logit.groupEnd();

    Storage.setItem(name, curr);
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
    actions: store.actions,
    getters: Object.entries(store.getters ?? {}).reduce(
      (acc, [key, val]) => {
        acc[key as keyof Getters] = useStore(val as Store);
        return acc;
      },
      {} as { [K in keyof Getters]: StoreValue<Getters[K]> },
    ),
    state: useStore(store.state),
  });
