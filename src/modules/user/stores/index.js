import * as userStore from './user';

export const reducer = {
  ...userStore.reducer
};

export const initialState = {
  user: userStore.initialState
};
