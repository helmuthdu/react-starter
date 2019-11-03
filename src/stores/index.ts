import * as userStore from '../modules/user/stores/user';
import * as localeStore from './locale';

type RootAction = {
  type: 'snapshot';
  payload: AppState;
};

export type AppState = {
  locale: localeStore.State;
  user: userStore.State;
};

export type AppAction = RootAction | localeStore.Action | userStore.Action;

type AppReducer =
  | { snapshot: (state: AppState, payload: RootAction) => AppState }
  | localeStore.Reducer
  | userStore.Reducer;

export const initialState: AppState = {
  locale: localeStore.initialState,
  user: userStore.initialState
};

const reducers: AppReducer = {
  snapshot: (state: AppState, payload: RootAction) => ({ ...state, ...payload }),
  ...localeStore.reducer,
  ...userStore.reducer
};

export const reducer = (state: AppState, action: AppAction) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (reducers as any)[action.type] ? (reducers as any)[action.type](state, action.payload as any) : state;
};
