import * as notificationStore from './notification.store';

export type State = {
  notification: notificationStore.State;
};

export type Reducer = typeof reducer;

export const reducer = {
  notification: notificationStore.reducer
};
