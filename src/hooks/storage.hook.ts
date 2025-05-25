import { useEffect, useState } from 'react';
import { Logger } from '../utils/logger.util';
import { Storage } from '../utils/storage.util';

export const useStorage = <T>(key: string, defaultValue?: T, session = false): [T, (data: T) => void] => {
  const [storage, setStorage] = useState(() => {
    const item = Storage.getItem<T>(key);

    if (item === undefined && defaultValue) {
      Storage.setItem(key, defaultValue, session);

      return defaultValue;
    }

    return item as T;
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: -
  useEffect(() => {
    Logger.info(`[STORAGE] watch('${key}')`, storage);
    Storage.setItem(key, storage);
  }, [storage]);

  return [storage, setStorage];
};
