/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.scss' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.webmanifest' {
  const content: any;
  export default content;
}

declare module '*.xml' {
  const content: any;
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}

interface Window {
  __NEXT_DATA__: any;
  __PRELOADED_STATE__: object;
  __REDUX_DEVTOOLS_EXTENSION__: object;
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
