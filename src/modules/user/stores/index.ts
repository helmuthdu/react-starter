import * as userStore from './user';

export type State = {
  user: userStore.State;
};

export type Action = userStore.Action;

export type Reducer = userStore.Reducer;

export const reducer: Reducer = {
  ...userStore.reducer
};

export const initialState: State = {
  user: userStore.initialState
};
