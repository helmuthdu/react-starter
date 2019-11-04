import { Notification } from '../../models/notification/notification.interface';
import { NotificationPayload } from './reducer';
import { NotificationActionTypes } from './types';

export type Action = {
  type: NotificationActionTypes;
  payload: NotificationPayload;
  callback?: () => void;
};

export const actionDeleteNotification = (callback?: () => void): Action => ({
  type: NotificationActionTypes.SET_NOTIFICATION,
  payload: {
    message: '',
    type: undefined
  },
  callback
});

export const actionSetNotification = (payload: Notification, callback?: () => void): Action => ({
  type: NotificationActionTypes.SET_NOTIFICATION,
  payload: payload,
  callback
});

export default {
  actionDeleteNotification,
  actionSetNotification
};
