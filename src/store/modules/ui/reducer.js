// @flow
import { initialState, UIStoreState } from './state';
import { UI_DISABLE_LOADING, UI_ENABLE_LOADING, UI_TOGGLE_LOADING } from './types';

export interface UIAction {
  +type: UI_DISABLE_LOADING | UI_ENABLE_LOADING | UI_TOGGLE_LOADING;
}

// Reducer
export const uiReducer = (state: UIStoreState = initialState, action: UIAction): UIStoreState => {
  let loadingCount = 0;

  switch (action.type) {
    case UI_ENABLE_LOADING:
      return Object.assign({}, state, { loadingCount: state.loadingCount + 1 });
    case UI_DISABLE_LOADING:
      loadingCount = state.loadingCount - 1 > 0 ? state.loadingCount - 1 : 0;
      return Object.assign({}, state, { loadingCount });
    case UI_TOGGLE_LOADING:
      loadingCount = state.loadingCount > 0 ? 0 : 1;
      return Object.assign({}, state, { loadingCount });
    default:
      return state;
  }
};
