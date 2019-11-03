import { AppState } from '../index';
import { State } from './state';
import { NotificationActionTypes } from './types';

type Payload = State;

export type Action = {
  type: NotificationActionTypes;
  payload: Payload;
};

export type Reducer = {
  [NotificationActionTypes.SET_NOTIFICATION]: (state: AppState, payload: Payload) => AppState;
};

export const reducer: Reducer = {
  [NotificationActionTypes.SET_NOTIFICATION]: (state: AppState, payload: Payload) => ({
    ...state,
    notification: {
      ...payload,
      timeout: payload.timeout || 5000
    }
  })
};
