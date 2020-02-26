/// <reference types="react-scripts" />
declare module 'anchorate';

interface Window {
  __PRELOADED_STATE__: object;
  __REDUX_DEVTOOLS_EXTENSION__: object;
}

type Enum<E> = Record<keyof E, number | string> & { [k: number]: string };

type ValueOf<T> = T[keyof T];

type Dictionary<T, K extends keyof any> = { [P in K]: T };

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends readonly (infer U)[]
    ? readonly DeepPartial<U>[]
    : DeepPartial<T[P]>;
};
