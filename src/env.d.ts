/// <reference types="vite/client" />

declare module '*.svg' {
  const ref: string;
  export default ref;
}

declare module '*.json' {
  const json: any;
  export default json;
}
