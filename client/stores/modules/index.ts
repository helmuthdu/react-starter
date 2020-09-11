import * as notificationStore from './notification';

export type State = {
  notification: notificationStore.State;
};

export type Action = notificationStore.Action;

export type Reducer = notificationStore.Reducer;

export const reducer: Reducer = {
  ...notificationStore.reducer
};

export const initialState: State = {
  notification: notificationStore.initialState
};
