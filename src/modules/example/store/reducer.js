// @flow
import { initialState, State } from './state';
import { AUTH_SET_USER } from './types';

export interface Actions {
  +type: AUTH_SET_USER;
  payload: State;
}

// Reducer
export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case AUTH_SET_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
