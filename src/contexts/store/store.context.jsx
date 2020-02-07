import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import useLocalStorage from '../../hooks/localstorage.hook';
import { useLogger } from '../../hooks/logger.hook';

const StoreContext = createContext({});
const StoreDispatchContext = createContext(undefined);

const StoreProvider = ({ reducer, initialState, children, logger }) => {
  const [storage, setStorage] = useLocalStorage('_app_state_snapshot');
  const [state, _dispatch] = useReducer(reducer, initialState);
  const [, setLog, printLog] = useLogger();

  const dispatch = action => {
    if (typeof action === 'function') return action(dispatch, state);

    const time = Date.now();
    Promise.resolve(action).then(act => {
      if (act) {
        if (logger) setLog(act, state, time);

        _dispatch(act);

        if (act.callback) act.callback();
      }
    });
  };

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

StoreProvider.propTypes = {
  reducer: PropTypes.func.isRequired,
  initialState: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  logger: PropTypes.bool
};

export const { Consumer: StoreConsumer } = StoreContext;

const useStore = () => {
  const state = useContext(StoreContext);
  if (state === undefined) {
    throw new Error(`useStore must be used within a StoreProvider`);
  }
  const dispatch = useContext(StoreDispatchContext);
  return [state, dispatch];
};

export { StoreProvider, useStore };
