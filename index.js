import * as authModule from './src/modules/auth';
import * as rootModule from './src/modules/root';

export const routes = [...rootModule.routes, ...authModule.routes];
export const stores = [...authModule.stores];

export default {
  routes,
  stores
};
