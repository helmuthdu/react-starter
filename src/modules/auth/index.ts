import * as storesModule from './stores';

export { routes } from './routes';

export type State = Readonly<{
  auth: storesModule.auth.State;
}>;

export const stores = Object.values(storesModule);
