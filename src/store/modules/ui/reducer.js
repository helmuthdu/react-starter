// @flow
import { initialState, UIStoreState } from './state';
import { UI_DISABLE_LOADING, UI_ENABLE_LOADING } from './types';

export interface UIAction {
  +type: UI_DISABLE_LOADING | UI_ENABLE_LOADING;
}

// Reducer
export const uiReducer = (state: UIStoreState = initialState, action: UIAction): UIStoreState => {
  switch (action.type) {
    case UI_ENABLE_LOADING:
      return Object.assign({}, state, { isLoading: true });
    case UI_DISABLE_LOADING:
      return Object.assign({}, state, { isLoading: false });
    default:
      return state;
  }
};
