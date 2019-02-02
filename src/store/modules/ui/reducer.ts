import { initialState, State } from './state';
import { ActionType } from './types';

export type Actions = {
  type: ActionType;
};

// Reducer
export const reducer = (state: State = initialState, action: Actions): State => {
  let loading = 0;

  switch (action.type) {
    case ActionType.UI_ENABLE_LOADING:
      return { ...state, ...{ loading: state.loading + 1 } };
    case ActionType.UI_DISABLE_LOADING:
      loading = state.loading - 1 > 0 ? state.loading - 1 : 0;
      return { ...state, ...{ loading: loading } };
    case ActionType.UI_TOGGLE_LOADING:
      loading = state.loading > 0 ? 0 : 1;
      return { ...state, ...{ loading: loading } };
    default:
      return state;
  }
};
