import * as user from './modules/user';

export type Action = user.Action;

export type Mutations = user.Mutations;

export type State = Readonly<{
  user: user.State;
}>;

export const stores = { user };
