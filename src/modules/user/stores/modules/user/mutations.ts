import { AppState } from '../../../../../stores';
import { State } from './state';
import { ActionTypes } from './types';

type Payload = State;

export type Action = Readonly<{
  type: ActionTypes;
  payload: Payload;
}>;

export type Mutations = {
  [ActionTypes.USER_SET_USER]: (state: AppState, payload: Payload) => AppState;
};

export const mutations: Mutations = {
  [ActionTypes.USER_SET_USER]: (state: AppState, payload: Payload) => ({
    ...state,
    user: { ...state.user, ...payload }
  })
};
