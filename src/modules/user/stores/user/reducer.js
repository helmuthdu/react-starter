import { UserActionTypes } from './types';

export const reducer = {
  [UserActionTypes.USER_SET_USER]: (state, payload) => ({
    ...state,
    user: { ...state.user, ...payload }
  })
};
