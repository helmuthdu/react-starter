import * as auth from './modules/user';

export type State = Readonly<{
  auth: auth.State;
}>;

export { auth };
