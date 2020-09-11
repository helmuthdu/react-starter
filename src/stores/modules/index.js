import * as localeStore from './locale';
import * as notificationStore from './notification';

export const reducer = {
  ...localeStore.reducer,
  ...notificationStore.reducer
};

export const initialState = {
  locale: localeStore.initialState,
  notification: notificationStore.initialState
};
