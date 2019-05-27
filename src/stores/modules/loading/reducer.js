import { initialState } from './state';
import { ActionTypes } from './types';

// Reducer
export const reducer = (state = initialState, action) => {
  let loading = 0;

  switch (action.type) {
    case ActionTypes.LOADING_ENABLE:
      return { ...state, ...{ count: state.count + 1 } };
    case ActionTypes.LOADING_DISABLE:
      loading = state.count - 1 > 0 ? state.count - 1 : 0;
      return { ...state, ...{ count: loading } };
    case ActionTypes.LOADING_TOGGLE:
      loading = state.count > 0 ? 0 : 1;
      return { ...state, ...{ count: loading } };
    default:
      return state;
  }
};
