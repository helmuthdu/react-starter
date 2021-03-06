import { useRef } from 'react';

export const useLogger = () => {
  const logger = useRef(null);

  const set = (action, state, time) => {
    logger.current = {
      type: action.type,
      action: action,
      elapsed: Date.now() - time,
      state: JSON.parse(JSON.stringify(state))
    };
  };

  const print = nextState => {
    if (!logger.current) return;

    const { type, state: prevState, action, elapsed } = logger.current;

    const timestamp = new Date().toISOString().split('T')[1].substr(0, 12);

    console.groupCollapsed(
      `%caction %c${type} %c@ ${timestamp} | ${elapsed}ms`,
      'color: gray; font-weight: lighter;',
      'color: inherit;',
      'color: gray; font-weight: lighter;'
    );
    console.log('%c prev state', 'color: #9E9E9E;', prevState);
    console.log('%c action    ', 'color: #03A9F4;', action);
    console.log('%c next state', 'color: #4CAF50;', nextState);
    console.groupEnd();

    // Reset the actions dispatching list
    logger.current = null;
  };

  return [logger.current, set, print];
};
