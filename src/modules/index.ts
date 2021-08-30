import * as mainModule from './main';
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

export const routes = [...mainModule.routes, ...userModule.routes];

const appModules = {
  initialState,
  reducer,
  routes
};

export default appModules;
