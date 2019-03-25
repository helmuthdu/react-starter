import * as authModule from './modules/auth';
import * as mainModule from './modules/main';
import * as appStores from './store/modules';

export type AppState = authModule.State & {
  loading: appStores.loading.State;
};

export const routes = [...mainModule.routes, ...authModule.routes];
export const stores = [...authModule.stores, ...Object.values(appStores)];

export default {
  routes,
  stores
};
