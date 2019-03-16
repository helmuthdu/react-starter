import * as Router from './routes';
import * as Store from './store';

export type State = {
  auth: Store.auth.State;
};

export const routes = Router;

export const stores = Object.values(Store);
