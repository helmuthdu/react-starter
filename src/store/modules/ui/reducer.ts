import { initialState, State } from './state';
import { ActionType } from './types';

export type Action = {
  readonly type: ActionType;
};

// Reducer
export const reducer = (state: State = initialState, action: Action): State => {
  let loading = 0;

  switch (action.type) {
    case ActionType.UI_ENABLE_LOADING:
      return { loading: state.loading + 1 };
    case ActionType.UI_DISABLE_LOADING:
      loading = state.loading - 1 > 0 ? state.loading - 1 : 0;
      return { loading };
    case ActionType.UI_TOGGLE_LOADING:
      loading = state.loading > 0 ? 0 : 1;
      return { loading };
    default:
      return state;
  }
};
