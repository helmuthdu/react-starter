import { routes as rootRoutes } from './root';
import { routes as userRoutes } from './user';

export const routes = [...rootRoutes, ...userRoutes];

const appModules = {
  routes
};

export default appModules;
