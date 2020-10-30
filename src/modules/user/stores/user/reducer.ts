import { User } from '@/modules/user/models/user';
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
    user: User.create({ ...state.user, ...payload })
  })
};
