import * as storesList from './store';

export { routes } from './routes';

export type State = {
  auth: storesList.auth.State;
};

export const stores = Object.values(storesList);
