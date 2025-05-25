import { Logger } from './logger.util';

const appName = (import.meta.env.VITE_NAME as string) ?? 'app';
const environment = (import.meta.env.NODE_ENV as string)?.substring(0, 3) ?? 'dev';
const prefix = `${appName}_${environment}`.toLowerCase();
const getKey = (key: string): string => `${prefix}_${key.toLowerCase()}`;
const getStorage = (session?: boolean): Storage | null =>
  typeof window !== 'undefined' ? (session ? sessionStorage : localStorage) : null;

export const Storage = {
  getItem<T>(key: string, options: { defaultValue?: T; parser?: (val: T) => T; session?: boolean } = {}): T {
    const { defaultValue, parser, session } = options;
    const storage = getStorage(session);
    if (!storage) return defaultValue as T;

    const storageKey = getKey(key);
    const item = storage.getItem(storageKey);

    if (item === null || item === undefined) return defaultValue as T;

    try {
      const parsedItem = JSON.parse(item);
      return parser ? parser(parsedItem) : parsedItem;
    } catch (error) {
      Logger.warn(`Storage item "${storageKey}" could not be parsed:`, error);
      return item as unknown as T;
    }
  },

  removeItem(key: string): void {
    this.setItem(key, undefined);
  },

  setItem<T>(key: string, value?: T, session = false): void {
    const storage = getStorage(session);
    if (!storage) return;

    const storageKey = getKey(key);

    try {
      if (value === undefined) {
        storage.removeItem(storageKey);
        if (!session) getStorage(true)?.removeItem(storageKey);
      } else {
        storage.setItem(storageKey, JSON.stringify(value));
      }
    } catch (error) {
      Logger.error(`Failed to save item "${storageKey}" into storage:`, error);
    }
  },
};
