import * as appStores from './store/modules';
import * as authModule from './modules/auth';
import * as mainModule from './modules/main';

export const routes = [...mainModule.routes, ...authModule.routes];
export const stores = [...authModule.stores, ...Object.values(appStores)];

export default {
  routes,
  stores
};
