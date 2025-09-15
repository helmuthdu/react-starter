import { isProd } from './env.util';
import { assert } from './function/assert';
import { Logit } from './logit.util';
import { isString } from './typed/isString';

const appName = import.meta.env.VITE_NAME ?? 'app';
const environment = isProd() ? 'prod' : 'dev';
let prefix = `${appName}_${environment}`.toLowerCase();
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
      Logit.warn(`Storage item "${storageKey}" could not be parsed:`, error);
      return item as unknown as T;
    }
  },

  removeItem(key: string, session = false): void {
    // Remove from both storages if not session
    this.setItem(key, undefined, session);
  },

  setItem<T>(key: string, value?: T, session = false): void {
    const storage = getStorage(session);
    if (!storage) return;

    const storageKey = getKey(key);

    try {
      if (value === undefined) {
        storage.removeItem(storageKey);
        // Remove from both storages if not session
        if (!session) getStorage(true)?.removeItem(storageKey);
      } else {
        storage.setItem(storageKey, JSON.stringify(value));
      }
    } catch (error) {
      Logit.error(`Failed to save item "${storageKey}" into storage:`, error);
    }
  },

  setPrefix(newPrefix: string) {
    assert(isString(newPrefix), 'Prefix must be a string');
    prefix = `${newPrefix}_${environment}`.toLowerCase();
  },
};
