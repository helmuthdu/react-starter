/// <reference types="react-scripts" />
declare module 'anchorate';

interface Window {
  __PRELOADED_STATE__?: object;
  __REDUX_DEVTOOLS_EXTENSION__?: object;
}

type ValueOf<T> = T[keyof T];

type Nullable<T> = T | null;

type Dictionary<T> = Record<T[keyof T] | keyof T | string, T | T[keyof T] | any>;

type DictionaryArray<T> = Record<T[keyof T] | keyof T | string, T[] | any[]>;

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends readonly (infer U)[]
    ? readonly DeepPartial<U>[]
    : DeepPartial<T[P]>;
};
