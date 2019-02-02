import routes from './router';
import * as stores from './store';

export type State = {
  auth: stores.auth.State;
};

export default { routes, stores: Object.values(stores) };
