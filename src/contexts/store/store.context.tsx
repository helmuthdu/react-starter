import React, { createContext, Dispatch, Reducer, ReducerState, useContext, useEffect, useReducer } from 'react';
import { AppAction, AppState } from '../../stores';

const StoreContext = createContext<ReducerState<Reducer<AppState, AppAction>> | undefined>(undefined);
const StoreDispatchContext = createContext<Dispatch<AppAction> | undefined>(undefined);

type Props = {
  reducer: Reducer<any, any>;
  initialState: any;
  children: React.ReactNode;
};
const StoreProvider = ({ reducer, initialState, children }: Props) => {
  const [state, dispatch] = useReducer<Reducer<AppState, AppAction>>(reducer, initialState);

  useEffect(() => {
    const data = localStorage.getItem('storage');
    if (data) {
      dispatch({
        type: 'dump',
        payload: JSON.parse(data)
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('storage', JSON.stringify(state));
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
