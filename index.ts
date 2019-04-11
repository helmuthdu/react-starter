import * as rootModule from './src/modules/root';
import * as authModule from './src/modules/auth';

export type State = authModule.State;

export const routes = [...rootModule.routes, ...authModule.routes];
export const stores = [...authModule.stores];

export default {
  routes,
  stores
};
