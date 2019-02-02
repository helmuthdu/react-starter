import { initialState, State } from './state';
import { ActionType } from './types';

export interface Actions {
  readonly type: ActionType;
  readonly payload: State;
}

// Reducer
export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.AUTH_SET_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
