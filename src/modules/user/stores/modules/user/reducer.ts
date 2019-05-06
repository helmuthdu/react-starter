import { initialState, State } from './state';
import { ActionType } from './types';

type Payload = State;

export type Action = Readonly<{
  type: ActionType;
  payload: Payload;
}>;

// Reducer
export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.USER_SET_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
