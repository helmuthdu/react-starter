import * as userStore from './user.store';

export type State = { user: userStore.State };

export type Reducer = typeof reducer;

export const reducer = {
  user: userStore.reducer
};
