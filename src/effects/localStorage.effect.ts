import { DefaultValue, RecoilState } from 'recoil';

export const localStorageEffect = (key: string) => <T>({
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
  const savedValue = localStorage.getItem(key);
  if (savedValue) {
    setSelf(JSON.parse(savedValue));
  }

  onSet(newValue => {
    if (newValue instanceof DefaultValue) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};
