import { initialState } from './state';
import { ActionType } from './types';

// Reducer
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUTH_SET_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
