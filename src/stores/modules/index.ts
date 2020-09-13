import * as errorsStore from './errors';
import * as localeStore from './locale';
import * as notificationStore from './notification';

export type Action = errorsStore.Action | localeStore.Action | notificationStore.Action;

export type Reducer = errorsStore.Reducer & localeStore.Reducer & notificationStore.Reducer;

export const reducer: Reducer = {
  ...errorsStore.reducer,
  ...localeStore.reducer,
  ...notificationStore.reducer
};

export type State = {
  errors: errorsStore.State;
  locale: localeStore.State;
  notification: notificationStore.State;
};

export const initialState: State = {
  errors: errorsStore.initialState,
  locale: localeStore.initialState,
  notification: notificationStore.initialState
};
