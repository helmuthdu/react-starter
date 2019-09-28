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

type Dictionary<T> = { [key: string]: T };

type DictionaryArray<T> = { [key: string]: [T] };
