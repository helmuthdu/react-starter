import React, { createContext, Dispatch, Reducer, useCallback, useContext, useEffect, useReducer } from 'react';
import useLocalStorage from '../hooks/localstorage.hook';
import { useLogger } from '../hooks/logger.hook';
import * as userStore from '../modules/user/stores/user';
import * as localeStore from './locale';
import * as notificationStore from './notification';

export type AppState = {
  locale: localeStore.State;
  notification: notificationStore.State;
  user: userStore.State;
};

type RootAction = {
  type: 'snapshot';
  payload: AppState;
  callback?: () => void;
};

export type AppAction = RootAction | localeStore.Action | notificationStore.Action | userStore.Action;

export type AppDispatch =
  | AppAction
  | Promise<AppAction | void>
  | ((dispatch: Dispatch<AppAction>) => Promise<void> | void)
  | ((dispatch: Dispatch<AppAction | AppDispatch>, state: AppState) => Promise<void> | void);

type SnapshotReducer = { snapshot: (state: AppState, payload: RootAction) => AppState };

type AppReducer = SnapshotReducer | localeStore.Reducer | notificationStore.Reducer | userStore.Reducer;

const reducers: AppReducer = {
  snapshot: (state: AppState, payload: RootAction) => ({ ...state, ...payload }),
  ...localeStore.reducer,
  ...notificationStore.reducer,
  ...userStore.reducer
};

const initialState: AppState = {
  locale: localeStore.initialState,
  notification: notificationStore.initialState,
  user: userStore.initialState
};

const StoreContext = createContext<AppState>({} as AppState);
const StoreDispatchContext = createContext<Dispatch<AppDispatch> | undefined>(undefined);

type Props = {
  children: React.ReactNode;
  logger?: boolean;
};
const StoreProvider = ({ children, logger }: Props) => {
  const [storage, setStorage] = useLocalStorage<AppState>('_app_state_snapshot');

  const reducer = useCallback(
    (state: AppState, action: AppAction) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (reducers as any)[action.type] ? (reducers as any)[action.type](state, action.payload) : state,
    []
  );
  const [state, _dispatch] = useReducer<Reducer<AppState, AppAction>>(reducer, initialState);
  const [, setLog, printLog] = useLogger();

  const dispatch = useCallback((action: AppDispatch): Promise<void> | void => {
    if (typeof action === 'function') return action(dispatch, state);

    const time = Date.now();
    Promise.resolve(action).then(act => {
      if (act) {
        if (logger) setLog(act, state, time);
        _dispatch(act);
        if (act.callback) act.callback();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (storage) {
      dispatch({ type: 'snapshot', payload: storage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setStorage(state);
    printLog(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <StoreContext.Provider value={state}>
      <StoreDispatchContext.Provider value={dispatch}>{children}</StoreDispatchContext.Provider>
    </StoreContext.Provider>
  );
};

const { Consumer: StoreConsumer } = StoreContext;

const useStore = (): [AppState, Dispatch<AppDispatch>] => {
  const state = useContext(StoreContext) as AppState;
  if (state === undefined) {
    throw new Error(`useStore must be used within a StoreProvider`);
  }
  const dispatch = useContext(StoreDispatchContext) as Dispatch<AppDispatch>;
  return [state, dispatch];
};

export { StoreProvider, StoreConsumer, useStore };
