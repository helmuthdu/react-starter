// @flow
import { initialState, State } from './state';
import { UI_DISABLE_LOADING, UI_ENABLE_LOADING, UI_TOGGLE_LOADING } from './types';

export interface Actions {
  +type: UI_DISABLE_LOADING | UI_ENABLE_LOADING | UI_TOGGLE_LOADING;
}

// Reducer
export const reducer = (state: State = initialState, action: Actions): State => {
  let loadingCount = 0;

  switch (action.type) {
    case UI_ENABLE_LOADING:
      return { ...state, ...{ loadingCount: state.loadingCount + 1 } };
    case UI_DISABLE_LOADING:
      loadingCount = state.loadingCount - 1 > 0 ? state.loadingCount - 1 : 0;
      return { ...state, ...{ loadingCount } };
    case UI_TOGGLE_LOADING:
      loadingCount = state.loadingCount > 0 ? 0 : 1;
      return { ...state, ...{ loadingCount } };
    default:
      return state;
  }
};
