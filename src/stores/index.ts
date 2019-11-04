import { Dispatch } from 'react';
import * as userStore from '../modules/user/stores/user';
import * as localeStore from './locale';
import * as notificationStore from './notification';

type RootAction = {
  type: 'snapshot';
  payload: AppState;
  callback?: () => void;
};

export type AppState = {
  locale: localeStore.State;
  notification: notificationStore.State;
  user: userStore.State;
};

export type AppAction = RootAction | localeStore.Action | notificationStore.Action | userStore.Action;

export type AppDispatch =
  | AppAction
  | Promise<AppAction>
  | ((dispatch: Dispatch<AppAction>) => Promise<void> | void)
  | ((dispatch: Dispatch<AppAction>, state: AppState) => Promise<void> | void)
  | ((dispatch: Dispatch<AppDispatch>, state: AppState) => Promise<void> | void);

type AppReducer =
  | { snapshot: (state: AppState, payload: RootAction) => AppState }
  | localeStore.Reducer
  | notificationStore.Reducer
  | userStore.Reducer;

export const initialState: AppState = {
  locale: localeStore.initialState,
  notification: notificationStore.initialState,
  user: userStore.initialState
};

const reducers: AppReducer = {
  snapshot: (state: AppState, payload: RootAction) => ({ ...state, ...payload }),
  ...localeStore.reducer,
  ...notificationStore.reducer,
  ...userStore.reducer
};

export const reducer = (state: AppState, action: AppAction) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (reducers as any)[action.type] ? (reducers as any)[action.type](state, action.payload as any) : state;
};
