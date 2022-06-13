declare module '*.svg' {
  const ref: string;
  export default ref;
}

type ValueOf<T> = T[keyof T];

type Nullable<T> = T | null;

type Dictionary<T> = Record<keyof T | T[keyof T] | string, T[keyof T] | T | any>;

type DictionaryArray<T> = Record<keyof T | T[keyof T] | string, T[] | any[]>;

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends readonly (infer U)[]
    ? readonly DeepPartial<U>[]
    : DeepPartial<T[P]>;
};
