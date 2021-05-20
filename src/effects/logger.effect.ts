import { DefaultValue, RecoilState } from 'recoil';
import { Logger } from '../utils';

export const loggerEffect =
  (name: string) =>
  <T>({
    onSet
  }: {
    node: RecoilState<T>;
    trigger: 'set' | 'get';

    // Call synchronously to initialize value or async to change it later
    setSelf: (
      param: T | DefaultValue | Promise<T | DefaultValue> | ((param: T | DefaultValue) => T | DefaultValue)
    ) => void;
    resetSelf: () => void;

    // Subscribe callbacks to events.
    // Atom effect observers are called before global transaction observers
    onSet: (param: (newValue: T | DefaultValue, oldValue: T | DefaultValue) => void) => void;
  }) => {
    onSet((nextState, prevState) => {
      Logger.groupCollapsed(name, 'EFFECT');
      Logger.debug('PREV_STATE', JSON.parse(JSON.stringify(prevState)));
      Logger.debug('NEXT_STATE', JSON.parse(JSON.stringify(nextState)));
      Logger.groupEnd();
    });
  };
