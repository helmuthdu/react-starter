import { useRef } from 'react';
import isEmpty from 'lodash/isEmpty';
import { AppAction, AppState } from '../stores';

type Logger = { type: string; action: AppAction; state: AppState; elapsed: number };

export const useLogger = () => {
  const logger = useRef<Logger>({} as Logger);

  const set = (action: AppAction, state: AppState, time: number) => {
    logger.current = {
      type: action.type,
      action: action,
      elapsed: Date.now() - time,
      state: JSON.parse(JSON.stringify(state))
    };
  };

  const print = (newState: AppState) => {
    if (isEmpty(logger.current)) return;

    const { type, state: previousState, action, elapsed } = logger.current;

    const timestamp = new Date()
      .toISOString()
      .split('T')[1]
      .substr(0, 12);

    console.groupCollapsed(
      `%caction %c${type} %c@ ${timestamp} | ${elapsed}ms`,
      'color: gray; font-weight: lighter;',
      'color: inherit;',
      'color: gray; font-weight: lighter;'
    );
    console.log('%c prev state', 'color: #9E9E9E;', previousState);
    console.log('%c action    ', 'color: #03A9F4;', action);
    console.log('%c next state', 'color: #4CAF50;', newState);
    console.groupEnd();

    // Reset the actions dispatching list
    logger.current = {} as Logger;
  };

  return { set, print };
};
