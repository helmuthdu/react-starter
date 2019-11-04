import { AppState } from '../index';
import { State } from './state';
import { NotificationActionTypes } from './types';

export type NotificationPayload = State;

export type Reducer = {
  [NotificationActionTypes.SET_NOTIFICATION]: (state: AppState, payload: NotificationPayload) => AppState;
};

export const reducer: Reducer = {
  [NotificationActionTypes.SET_NOTIFICATION]: (state: AppState, payload: NotificationPayload) => ({
    ...state,
    notification: {
      ...payload,
      timeout: payload.timeout || 5000
    }
  })
};
