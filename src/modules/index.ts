import { routes as mainRoutes } from './main';
import { routes as userRoutes } from './user';

export const routes = [...mainRoutes, ...userRoutes];

const appModules = {
  routes
};

export default appModules;
