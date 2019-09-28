import { initialState, State } from './state';
import { ActionTypes } from './types';

type Payload = State;

export type Action = Readonly<{
  type: ActionTypes;
  payload: Payload;
}>;

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.USER_SET_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
