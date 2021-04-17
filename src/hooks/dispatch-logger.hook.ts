import { useRef } from 'react';
import { AppAction, AppState } from '../stores';
import { Logger } from '../utils';

type LoggerParams = { type: string; action: AppAction; state: AppState; time: number };

export const useDispatchLogger = (): [
  LoggerParams | null,
  (action: AppAction, state: AppState, time: number) => void,
  (nextState: AppState) => void
] => {
  const logger = useRef<LoggerParams | null>(null);

  const set = (action: AppAction, state: AppState, time: number) => {
    logger.current = {
      type: action.type,
      action: action,
      time: time,
      state: JSON.parse(JSON.stringify(state))
    };
  };

  const print = (nextState: AppState) => {
    if (!logger.current) return;

    const { type, state: prevState, action, time } = logger.current;

    Logger.groupCollapsed(type, 'ACTION', time);
    Logger.debug('ACTION', action);
    Logger.debug('PREV_STATE', prevState);
    Logger.debug('NEXT_STATE', nextState);
    Logger.groupEnd();

    // Reset the actions dispatching list
    logger.current = null;
  };

  return [logger.current, set, print];
};

export default useDispatchLogger;
