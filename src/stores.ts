import { Action, Mutations, State, stores } from './modules';

type RootAction = {
  type: 'snapshot';
  payload: AppState;
};

export type AppState = State;

export type AppAction = RootAction | Action;

export const initialState: State = {
  [stores.user.name]: stores.user.initialState
};

type RootMutations = {
  snapshot: (state: AppState, payload: AppState) => AppState;
};

const mutations: RootMutations & Mutations = {
  snapshot: (state: AppState, payload: AppState) => ({ ...state, ...payload }),
  ...stores.user.mutations
};

export const reducer = (state: AppState, action: AppAction) => {
  return mutations[action.type] ? mutations[action.type](state, action.payload as any) : state;
};
