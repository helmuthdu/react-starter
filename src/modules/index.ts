import * as userStore from './user/stores';

export type State = userStore.State;

export type Action = userStore.Action;

export type Reducer = userStore.Reducer;

export const reducer: Reducer = {
  ...userStore.reducer
};

export const initialState: State = {
  ...userStore.initialState
};

export default {
  initialState,
  reducer
};
