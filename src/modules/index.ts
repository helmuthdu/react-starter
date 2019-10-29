import { routes as rootRoutes } from './root';
import * as userModule from './user';

export type State = userModule.State;

export type Action = userModule.Action;

export type Mutations = userModule.Mutations;

export const routes = [...rootRoutes, ...userModule.routes];

export const stores = { ...userModule.stores };

export default {
  routes,
  stores
};
