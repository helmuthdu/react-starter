import { initialState, State } from './state';
import { ActionType } from './types';

export interface Action {
  readonly type: ActionType;
}

// Reducer
export const reducer = (state: State = initialState, action: Action): State => {
  let loading = 0;

  switch (action.type) {
    case ActionType.LOADING_ENABLE_LOADING:
      return { count: state.count + 1 };
    case ActionType.LOADING_DISABLE_LOADING:
      loading = state.count - 1 > 0 ? state.count - 1 : 0;
      return { count: loading };
    case ActionType.LOADING_TOGGLE_LOADING:
      loading = state.count > 0 ? 0 : 1;
      return { count: loading };
    default:
      return state;
  }
};
