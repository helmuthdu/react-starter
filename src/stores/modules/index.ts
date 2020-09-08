import * as localeStore from './locale';
import * as notificationStore from './notification';

export type State = {
  locale: localeStore.State;
  notification: notificationStore.State;
};

export type Action = localeStore.Action | notificationStore.Action;

export type Reducer = localeStore.Reducer | notificationStore.Reducer;

export const reducer: Reducer = {
  ...localeStore.reducer,
  ...notificationStore.reducer
};

export const initialState: State = {
  locale: localeStore.initialState,
  notification: notificationStore.initialState
};
