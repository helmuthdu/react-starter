import * as errorsStore from './errors';
import * as notificationStore from './notification';

export type Action = errorsStore.Action | notificationStore.Action;

export type Reducer = errorsStore.Reducer & notificationStore.Reducer;

export const reducer: Reducer = {
  ...errorsStore.reducer,
  ...notificationStore.reducer
};

export type State = {
  errors: errorsStore.State;
  notification: notificationStore.State;
};

export const initialState: State = {
  errors: errorsStore.initialState,
  notification: notificationStore.initialState
};
