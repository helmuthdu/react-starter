import * as loading from './loading';

export type State = Readonly<{
  loading: loading.State;
}>;

export const stores = [loading];

export { loading };
