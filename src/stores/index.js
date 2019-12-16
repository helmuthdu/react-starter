import * as userStore from '../modules/user/stores/user';
import * as localeStore from './locale';
import * as notificationStore from './notification';

export const initialState = {
  locale: localeStore.initialState,
  notification: notificationStore.initialState,
  user: userStore.initialState
};

const reducers = {
  snapshot: (state, payload) => ({ ...state, ...payload }),
  ...localeStore.reducer,
  ...notificationStore.reducer,
  ...userStore.reducer
};

export const reducer = (state, action) => {
  return reducers[action.type] ? reducers[action.type](state, action.payload) : state;
};
