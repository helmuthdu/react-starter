import * as rootModule from './root';
import * as userModule from './user';

export const reducer = {
  ...userModule.reducer
};

export const initialState = {
  ...userModule.initialState
};

export const routes = [...rootModule.routes, ...userModule.routes];

export default {
  initialState,
  reducer,
  routes
};
