import * as user from './modules/user';

export type Action = user.Action;

export type Reducer = user.Reducer;

export type State = {
  user: user.State;
};

export const stores = { user };
