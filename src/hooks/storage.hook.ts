import { useRef, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '../utils';

export const useStorage = <T>(key: string, defaultValue?: T, session = false) => {
  const getItem = () => {
    const item = getStorageItem<T>(key);
    if (!item && defaultValue) {
      setStorageItem(key, defaultValue, session);
      return defaultValue;
    }
    return item;
  };

  const storage = useRef(getItem());

  useEffect(() => {
    setStorageItem(key, storage.current);
  }, [key, storage]);

  return storage;
};

export default useStorage;
