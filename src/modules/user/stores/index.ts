import * as userStore from './user';

export type Action = userStore.Action;

export type Reducer = userStore.Reducer;

export const reducer: Reducer = {
  ...userStore.reducer
};

export type State = {
  user: userStore.State;
};

export const initialState: State = {
  user: userStore.initialState
};
