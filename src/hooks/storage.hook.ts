import { useEffect, useState } from 'react';
import { Logger, getStorageItem, setStorageItem } from '../utils';

export const useStorage = <T>(key: string, defaultValue?: T, session = false): [T, (data: T) => void] => {
  const [storage, setStorage] = useState(() => {
    const item = getStorageItem<T>(key);

    if (item === undefined && defaultValue) {
      setStorageItem(key, defaultValue, session);

      return defaultValue;
    }

    return item as T;
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    Logger.info(`[STORAGE] watch('${key}')`, storage);
    setStorageItem(key, storage);
  }, [storage]);

  return [storage, setStorage];
};
