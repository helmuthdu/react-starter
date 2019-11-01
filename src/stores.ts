import { Action, Reducer, State, stores } from './modules';

type RootAction = {
  type: 'snapshot';
  payload: AppState;
};

export type AppState = State;

export type AppAction = RootAction | Action;

export const initialState: State = {
  ...(Object.entries(stores).reduce((acc, [, val]) => ({ ...acc, [val.name]: val.initialState }), {}) as State)
};

type RootReducer = {
  snapshot: (state: AppState, payload: AppState) => AppState;
};

const reducers: RootReducer & Reducer = {
  snapshot: (state: AppState, payload: AppState) => ({ ...state, ...payload }),
  ...(Object.entries(stores).reduce((acc, [, val]) => ({ ...acc, ...val.reducer }), {}) as Reducer)
};

export const reducer = (state: AppState, action: AppAction) => {
  return reducers[action.type] ? reducers[action.type](state, action.payload as any) : state;
};
