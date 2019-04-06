import { initialState } from './state';
import { ActionType } from './types';

// Reducer
export const reducer = (state = initialState, action) => {
  let loading = 0;

  switch (action.type) {
    case ActionType.LOADING_ENABLE:
      return { ...state, ...{ count: state.count + 1 } };
    case ActionType.LOADING_DISABLE:
      loading = state.count - 1 > 0 ? state.count - 1 : 0;
      return { ...state, ...{ count: loading } };
    case ActionType.LOADING_TOGGLE:
      loading = state.count > 0 ? 0 : 1;
      return { ...state, ...{ count: loading } };
    default:
      return state;
  }
};
