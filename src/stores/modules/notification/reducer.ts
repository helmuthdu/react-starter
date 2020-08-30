import { NotificationScheme } from '../../../models/notification/notification.scheme';
import { Action } from './actions';
import { initialState, State } from './state';
import { NotificationActionTypes } from './types';

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case NotificationActionTypes.NOTIFICATION_ADD_MESSAGE:
      const notification = {
        ...action.payload,
        timeout: action.payload?.timeout || 5000
      } as NotificationScheme;
      return [...state, notification];
    case NotificationActionTypes.NOTIFICATION_DELETE_MESSAGES:
      return [];
    case NotificationActionTypes.NOTIFICATION_NEXT_MESSAGE:
      return [...state].slice(1);
    default:
      return state;
  }
};
