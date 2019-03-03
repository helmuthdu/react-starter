import { initialState } from './state';
import { ActionType } from './types';

// Reducer
export const reducer = (state = initialState, action) => {
  let loading = 0;

  switch (action.type) {
    case ActionType.UI_ENABLE_LOADING:
      return { ...state, ...{ count: state.count + 1 } };
    case ActionType.UI_DISABLE_LOADING:
      loading = state.count - 1 > 0 ? state.count - 1 : 0;
      return { ...state, ...{ count: loading } };
    case ActionType.UI_TOGGLE_LOADING:
      loading = state.count > 0 ? 0 : 1;
      return { ...state, ...{ count: loading } };
    default:
      return state;
  }
};
