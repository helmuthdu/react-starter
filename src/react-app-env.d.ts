/// <reference types="react-scripts" />
declare module 'anchorate';

interface Window {
  __PRELOADED_STATE__: object;
  __REDUX_DEVTOOLS_EXTENSION__: object;
}

type Enum<E> = Record<keyof E, number | string> & { [P in keyof E]: string };

type ValueOf<T> = T[keyof T];

type Dictionary<T> = { [P in T[keyof T] | keyof T | string]: T };

type DictionaryArray<T> = { [P in T[keyof T] | keyof T | string]: [T] };

type Nullable<T> = T | null;

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends readonly (infer U)[]
    ? readonly DeepPartial<U>[]
    : DeepPartial<T[P]>;
};
