export { routes } from './routes';
import * as storesList from './store';

export type State = {
  auth: storesList.auth.State;
};

export const stores = Object.values(storesList);
