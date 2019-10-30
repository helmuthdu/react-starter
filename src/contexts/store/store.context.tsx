import React, { createContext, Dispatch, Reducer, useCallback, useContext, useEffect, useReducer, useRef } from 'react';
import useLocalStorage from '../../hooks/localstorage.hook';
import { AppAction, AppState } from '../../stores';

const StoreContext = createContext<AppState | undefined>(undefined);

type AppDispatch = AppAction | Promise<AppAction> | ((dispatch: Dispatch<AppAction>, state: AppState) => Promise<void>);
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
  // We use preState for storing the previous state and storing actionType
  // when if the user dispatch any action with type to in logging
  const preState = useRef({ actions: [] } as { actions: { actionType: string; action: AppAction; state: AppState }[] });

  // @Note we added empty dependency for dispatch callback
  // because user can use it exactly the same way as normal dispatch
  // of useReducer for dependencies.
  const dispatch = useCallback((action: AppDispatch): Promise<void> | void => {
    if (typeof action === 'function') return action(dispatch, state);

    Promise.resolve(action).then(act => {
      preState.current.actions = preState.current.actions || [];
      preState.current.actions.push({ actionType: act.type, action: act, state: JSON.parse(JSON.stringify(state)) });

      _dispatch(act);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // @Note after every dispatch state update useEffect get called because
  // we added the state in dependencies.
  useEffect(() => {
    // Save state snapshot
    setStorage(state);

    // we can print the logs only in case user enable it and user update state
    if (!logger || !preState.current) return;

    for (let i = 0; i < preState.current.actions.length; i++) {
      const { actionType, state: previousState, action } = preState.current.actions[i];

      const timestamp = new Date()
        .toISOString()
        .split('T')[1]
        .substr(0, 12);

      console.groupCollapsed(
        `%caction %c${actionType} %c@ ${timestamp}`,
        'color: gray; font-weight: lighter;',
        'color: inherit;',
        'color: gray; font-weight: lighter;'
      );
      console.log('%c prev state', 'color: #9E9E9E;', previousState);
      console.log('%c action    ', 'color: #03A9F4;', action);
      console.log('%c next state', 'color: #4CAF50;', state);
      console.groupEnd();
    }

    // Reset the actions dispatching list
    preState.current.actions = [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, logger]);

  useEffect(() => {
    if (storage) {
      // Load state snapshot
      dispatch({ type: 'snapshot', payload: storage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StoreContext.Provider value={state}>
      <StoreDispatchContext.Provider value={dispatch}>{children}</StoreDispatchContext.Provider>
    </StoreContext.Provider>
  );
};

const useStore = (): [AppState, Dispatch<AppDispatch>] => {
  const state = useContext(StoreContext) as AppState;
  if (state === undefined) {
    throw new Error(`useStore must be used within a StoreProvider`);
  }
  const dispatch = useContext(StoreDispatchContext) as Dispatch<AppDispatch>;
  return [state, dispatch];
};

export { StoreProvider, useStore };
