import * as userStore from './user.store';

export type State = { user: userStore.State };

export const reducer = {
  user: userStore.reducer
};
