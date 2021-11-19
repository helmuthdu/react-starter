import * as notificationStore from './notifications.store';

export type State = {
  notifications: notificationStore.State;
};

export const reducer = {
  notifications: notificationStore.reducer
};
