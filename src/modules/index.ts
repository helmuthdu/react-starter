import * as homeModule from './home';
import * as userModule from './user';

export const routes = [...homeModule.routes, ...userModule.routes];
export const stores = { ...userModule.stores };

export default {
  routes,
  stores,
};
