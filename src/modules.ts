import * as authModule from './modules/auth';
import * as rootModule from './modules/root';
import * as rootStores from './stores/modules';

export type AppState = authModule.State & {
  loading: rootStores.loading.State;
};

export const routes = [...rootModule.routes, ...authModule.routes];
export const stores = [...Object.values(rootStores), ...authModule.stores];

export default {
  routes,
  stores
};
