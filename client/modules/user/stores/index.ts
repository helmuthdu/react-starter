import * as user from './modules/user';

export type State = Readonly<{
  user: user.State;
}>;

export { user };
