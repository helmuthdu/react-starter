import * as authModule from './modules/auth';
import * as mainModule from './modules/main';
import * as store from './store/modules';

export type AppState = authModule.State & {
  loading: store.loading.State;
};

export const routes = [...mainModule.routes, ...authModule.routes];
export const stores = [...authModule.stores, ...Object.values(store)];

export default {
  routes,
  stores
};
