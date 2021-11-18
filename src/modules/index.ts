import * as mainModule from './main';
import * as userModule from './user';

export type State = userModule.State;

export type Reducer = typeof reducer;

export const reducer = {
  ...userModule.reducer
};

export const routes = [...mainModule.routes, ...userModule.routes];
