import { NotificationActionTypes } from './types';

export const reducer = {
  [NotificationActionTypes.NOTIFICATION_ADD_MESSAGE]: (state, payload) => ({
    ...state,
    notification: [
      ...state.notification,
      {
        ...payload,
        timeout: payload.timeout || 5000
      }
    ]
  }),
  [NotificationActionTypes.NOTIFICATION_DELETE_MESSAGES]: state => ({
    ...state,
    notification: []
  }),
  [NotificationActionTypes.NOTIFICATION_NEXT_MESSAGE]: state => ({
    ...state,
    notification: [...state.notification].slice(1)
  })
};
