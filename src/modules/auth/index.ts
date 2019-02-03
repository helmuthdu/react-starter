import router from './router';
import * as store from './store';

export type State = {
  auth: store.auth.State;
};

export const routes = router;

export const stores = Object.values(store);
