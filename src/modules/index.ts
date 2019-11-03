import { routes as rootRoutes } from './root';
import { routes as userRoutes } from './user';

export const routes = [...rootRoutes, ...userRoutes];

export default {
  routes
};
