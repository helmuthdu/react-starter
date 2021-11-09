import React, { createContext, Dispatch, Reducer, useCallback, useContext, useEffect, useReducer } from 'react';
import { useDispatchLogger, useStorage } from '../hooks';
import * as appModules from '../modules';
import * as rootModules from './modules';

export type AppState = rootModules.State & appModules.State;

type RootAction = {
  type: 'snapshot';
  payload: AppState;
  callback?: () => void;
};

export type AppAction = RootAction | rootModules.Action | appModules.Action;

export type AppDispatch =
  | AppAction
  | Promise<AppAction | void>
  | ((dispatch: Dispatch<AppAction>) => Promise<void> | void)
  | ((dispatch: Dispatch<AppAction | AppDispatch>, state: AppState) => Promise<void> | void);

type SnapshotReducer = { snapshot: (state: AppState, payload: RootAction) => AppState };

type AppReducer = SnapshotReducer & rootModules.Reducer & appModules.Reducer;

const reducers: AppReducer = {
  snapshot: (state: AppState, payload: RootAction) => ({ ...state, ...payload }),
  ...rootModules.reducer,
  ...appModules.reducer
};

const initialState: AppState = {
  ...rootModules.initialState,
  ...appModules.initialState
};

const StoreStateContext = createContext<AppState>({} as AppState);
const StoreDispatchContext = createContext<Dispatch<AppDispatch> | undefined>(undefined);

type Props = {
  children: React.ReactNode;
  logger?: boolean;
};
const StoreProvider = ({ children, logger }: Props): JSX.Element => {
  const reducer = useCallback(
    (state: AppState, action: AppAction): AppState =>
      reducers[action.type] ? reducers[action.type](state, action.payload as any) : state,
    []
  );
  const [state, _dispatch] = useReducer<Reducer<AppState, AppAction>>(reducer, initialState);
  const [, setLog, printLog] = useDispatchLogger();
  const [storage, setStorage] = useStorage<AppState>('snapshot');

  const dispatch = useCallback((action: AppDispatch): Promise<void> | void => {
    if (typeof action === 'function') {
      return action(dispatch, state);
    }

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
    <StoreStateContext.Provider value={state}>
      <StoreDispatchContext.Provider value={dispatch}>{children}</StoreDispatchContext.Provider>
    </StoreStateContext.Provider>
  );
};

const { Consumer: StoreConsumer } = StoreStateContext;

const useStore = (): [AppState, Dispatch<AppDispatch>] => {
  const state = useContext(StoreStateContext) as AppState;
  if (state === undefined) {
    throw new Error(`useStore must be used within a StoreProvider`);
  }
  const dispatch = useContext(StoreDispatchContext) as Dispatch<AppDispatch>;
  return [state, dispatch];
};

export { StoreProvider, StoreConsumer, useStore };
