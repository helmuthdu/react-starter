import React, { createContext, Dispatch, Reducer, useContext, useEffect, useReducer } from 'react';
import useLocalStorage from '../../hooks/localstorage.hook';
import { AppAction, AppState } from '../../stores';

const StoreContext = createContext<AppState | undefined>(undefined);
const StoreDispatchContext = createContext<Dispatch<AppAction> | undefined>(undefined);

type Props = {
  reducer: Reducer<AppState, AppAction>;
  initialState: AppState;
  children: React.ReactNode;
};
const StoreProvider = ({ reducer, initialState, children }: Props) => {
  const [state, dispatch] = useReducer<Reducer<AppState, AppAction>>(reducer, initialState);
  const [storage, setStorage] = useLocalStorage<AppState>('_app_state');

  useEffect(() => {
    if (storage) {
      dispatch({ type: 'dump', payload: storage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setStorage(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <StoreContext.Provider value={state}>
      <StoreDispatchContext.Provider value={dispatch}>{children}</StoreDispatchContext.Provider>
    </StoreContext.Provider>
  );
};

const useStore = (): [AppState, Dispatch<AppAction>] => {
  const state = useContext(StoreContext) as AppState;
  if (state === undefined) {
    throw new Error(`useStore must be used within a StoreProvider`);
  }
  const dispatch = useContext(StoreDispatchContext) as Dispatch<AppAction>;
  return [state, dispatch];
};

export { StoreProvider, useStore };
