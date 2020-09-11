import { AppState } from '@/stores';
import { State } from './state';
import { UserActionTypes } from './types';

export type UserPayload = State;

export type Reducer = {
  [UserActionTypes.USER_SET_USER]: (state: AppState, payload: UserPayload) => AppState;
};

export const reducer: Reducer = {
  [UserActionTypes.USER_SET_USER]: (state: AppState, payload: UserPayload) => ({
    ...state,
    user: { ...state.user, ...payload }
  })
};
