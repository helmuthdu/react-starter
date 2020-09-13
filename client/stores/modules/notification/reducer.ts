import { NotificationSchema } from '@/models/notification/notification.interface';
import { AppState } from '@/stores';
import { NotificationActionTypes } from './types';

export type NotificationPayload = NotificationSchema;

export type Reducer = {
  [NotificationActionTypes.NOTIFICATION_ADD_MESSAGE]: (state: AppState, payload: NotificationPayload) => AppState;
  [NotificationActionTypes.NOTIFICATION_DELETE_MESSAGES]: (state: AppState, payload: NotificationPayload) => AppState;
  [NotificationActionTypes.NOTIFICATION_NEXT_MESSAGE]: (state: AppState, payload: NotificationPayload) => AppState;
};

export const reducer: Reducer = {
  [NotificationActionTypes.NOTIFICATION_ADD_MESSAGE]: (state: AppState, payload: NotificationPayload) => ({
    ...state,
    notification: [
      ...state.notification,
      {
        ...payload,
        timeout: payload.timeout || 5000
      }
    ]
  }),
  [NotificationActionTypes.NOTIFICATION_DELETE_MESSAGES]: (state: AppState) => ({
    ...state,
    notification: []
  }),
  [NotificationActionTypes.NOTIFICATION_NEXT_MESSAGE]: (state: AppState) => ({
    ...state,
    notification: [...state.notification].slice(1)
  })
};
