import { AppState } from '../../../../stores';
import { State } from './state';
import { UserActionTypes } from './types';

type Payload = State;

export type Action = {
  type: UserActionTypes;
  payload: Payload;
};

export type Reducer = {
  [UserActionTypes.USER_SET_USER]: (state: AppState, payload: Payload) => AppState;
};

export const reducer: Reducer = {
  [UserActionTypes.USER_SET_USER]: (state: AppState, payload: Payload) => ({
    ...state,
    user: { ...state.user, ...payload }
  })
};
