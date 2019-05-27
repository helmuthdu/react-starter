import { initialState, State } from './state';
import { ActionTypes } from './types';

export interface Action {
  readonly type: ActionTypes;
}

// Reducer
export const reducer = (state: State = initialState, action: Action): State => {
  let loading = 0;

  switch (action.type) {
    case ActionTypes.LOADING_ENABLE_LOADING:
      return { count: state.count + 1 };
    case ActionTypes.LOADING_DISABLE_LOADING:
      loading = state.count - 1 > 0 ? state.count - 1 : 0;
      return { count: loading };
    case ActionTypes.LOADING_TOGGLE_LOADING:
      loading = state.count > 0 ? 0 : 1;
      return { count: loading };
    default:
      return state;
  }
};
