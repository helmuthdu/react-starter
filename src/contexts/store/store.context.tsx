import React, { createContext, Dispatch, Reducer, useCallback, useContext, useEffect, useReducer } from 'react';
import useLocalStorage from '../../hooks/localstorage.hook';
import { useLogger } from '../../hooks/logger.hook';
import { AppAction, AppDispatch, AppState } from '../../stores';

const StoreContext = createContext<AppState>({} as AppState);
const StoreDispatchContext = createContext<Dispatch<AppDispatch> | undefined>(undefined);

type Props = {
  reducer: Reducer<AppState, AppAction>;
  initialState: AppState;
  children: React.ReactNode;
  logger?: boolean;
};
const StoreProvider = ({ reducer, initialState, children, logger }: Props) => {
  const [storage, setStorage] = useLocalStorage<AppState>('_app_state_snapshot');
  const [state, _dispatch] = useReducer<Reducer<AppState, AppAction>>(reducer, initialState);

  // We use preState for storing the previous state and storing action type
  // when if the user dispatch any action with type to in logging
  const preState = useLogger();

  const dispatch = useCallback(
    (action: AppDispatch): Promise<void> | void => {
      if (typeof action === 'function') return action(dispatch, state);

      const time = Date.now();
      Promise.resolve(action).then(act => {
        if (logger) preState.set(act, state, time);

        _dispatch(act);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [_dispatch]
  );

  useEffect(() => {
    if (storage) {
      // Load state snapshot
      dispatch({ type: 'snapshot', payload: storage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // @Note after every dispatch state update useEffect get called because
  // we added the state in dependencies.
  useEffect(() => {
    // Save state snapshot
    setStorage(state);

    if (logger) preState.print(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, logger]);

  return (
    <StoreContext.Provider value={state}>
      <StoreDispatchContext.Provider value={dispatch}>{children}</StoreDispatchContext.Provider>
    </StoreContext.Provider>
  );
};

export const { Consumer: StoreConsumer } = StoreContext;

const useStore = (): [AppState, Dispatch<AppDispatch>] => {
  const state = useContext(StoreContext) as AppState;
  if (state === undefined) {
    throw new Error(`useStore must be used within a StoreProvider`);
  }
  const dispatch = useContext(StoreDispatchContext) as Dispatch<AppDispatch>;
  return [state, dispatch];
};

export { StoreProvider, useStore };
