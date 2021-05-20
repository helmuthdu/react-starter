import { DefaultValue, RecoilState } from 'recoil';
import { getStorageItem, removeStorageItem, setStorageItem } from '../utils';

export const localStorageEffect =
  (key: string) =>
  <T>({
    setSelf,
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
    const savedValue = getStorageItem<T>(key);
    if (savedValue) {
      setSelf(savedValue);
    }

    onSet(newValue => {
      if (newValue instanceof DefaultValue) {
        removeStorageItem(key);
      } else {
        setStorageItem<T>(key, newValue);
      }
    });
  };
