import { NotificationScheme } from '../../../models/notification/notification.interface';
import { NotificationPayload } from './reducer';
import { NotificationActionTypes } from './types';

export type Action = {
  type: NotificationActionTypes;
  payload?: NotificationPayload;
  callback?: () => void;
};

export const actionAddNotification = (payload: NotificationScheme, callback?: () => void): Action => ({
  type: NotificationActionTypes.NOTIFICATION_ADD_MESSAGE,
  payload,
  callback
});

export const actionDeleteNotification = (callback?: () => void): Action => ({
  type: NotificationActionTypes.NOTIFICATION_DELETE_MESSAGES,
  callback
});

export const actionNextNotification = (callback?: () => void): Action => ({
  type: NotificationActionTypes.NOTIFICATION_NEXT_MESSAGE,
  callback
});

export default {
  actionAddNotification,
  actionDeleteNotification,
  actionNextNotification
};
