import { initialState } from './state';
import { ActionTypes } from './types';

// Reducer
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.USER_SET_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
