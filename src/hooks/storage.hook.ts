import { useEffect, useState } from 'react';
import { getStorageItem, setStorageItem } from '../utils';

type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

export const useStorage = <T>(key: string, defaultValue?: T, session = false): [T, Dispatch<SetStateAction<T>>] => {
  const getItem = () => {
    const item = getStorageItem<T>(key);
    if (!item && defaultValue) {
      setStorageItem(key, defaultValue, session);
      return defaultValue;
    }
    return item;
  };

  const [storage, setStorage] = useState(getItem() as T);

  useEffect(() => {
    setStorageItem(key, storage);
  }, [key, storage]);

  return [storage, setStorage];
};

export default useStorage;
