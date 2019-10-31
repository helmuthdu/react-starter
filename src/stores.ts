import { Action, Reducer, State, stores } from './modules';

type RootAction = {
  type: 'snapshot';
  payload: AppState;
};

export type AppState = State;

export type AppAction = RootAction | Action;

export const initialState: State = {
  [stores.user.name]: stores.user.initialState
};

type RootReducer = {
  snapshot: (state: AppState, payload: AppState) => AppState;
};

const reducers: RootReducer & Reducer = {
  snapshot: (state: AppState, payload: AppState) => ({ ...state, ...payload }),
  ...stores.user.reducer
};

export const reducer = (state: AppState, action: AppAction) => {
  return reducers[action.type] ? reducers[action.type](state, action.payload as any) : state;
};
