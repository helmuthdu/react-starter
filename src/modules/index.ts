import * as rootModule from './root';
import * as userModule from './user';

export type State = userModule.State;

export type Action = userModule.Action;

export type Reducer = userModule.Reducer;

export const reducer: Reducer = {
  ...userModule.reducer
};

export const initialState: State = {
  ...userModule.initialState
};

export const routes = [...rootModule.routes, ...userModule.routes];

export default {
  initialState,
  reducer,
  routes
};
