import * as store from './store';

export { routes } from './routes';

export type State = Readonly<{
  auth: store.auth.State;
}>;

export const stores = Object.values(store);
