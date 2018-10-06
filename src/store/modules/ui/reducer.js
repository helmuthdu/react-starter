// @flow
import { initialState, State } from './state';
import { UI_DISABLE_LOADING, UI_ENABLE_LOADING, UI_TOGGLE_LOADING } from './types';

export interface Actions {
  +type: UI_DISABLE_LOADING | UI_ENABLE_LOADING | UI_TOGGLE_LOADING;
}

// Reducer
export const reducer = (state: State = initialState, action: Actions): State => {
  let loading = 0;

  switch (action.type) {
    case UI_ENABLE_LOADING:
      return { ...state, ...{ loading: state.loading + 1 } };
    case UI_DISABLE_LOADING:
      loading = state.loading - 1 > 0 ? state.loading - 1 : 0;
      return { ...state, ...{ loading: loading } };
    case UI_TOGGLE_LOADING:
      loading = state.loading > 0 ? 0 : 1;
      return { ...state, ...{ loading: loading } };
    default:
      return state;
  }
};
