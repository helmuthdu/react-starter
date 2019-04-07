import * as authModule from './auth';
import * as rootModule from './root';

export const routes = [...rootModule.routes, ...authModule.routes];
export const stores = [...authModule.stores];

export default {
  routes,
  stores
};
