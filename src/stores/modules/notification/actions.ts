import { Notification } from '../../../models/notification/notification.interface';
import { NotificationActionTypes } from './types';

export type Action = {
  type: NotificationActionTypes;
  payload?: Notification;
  callback?: () => void;
};

export const actionAddNotification = (payload: Notification, callback?: () => void): Action => ({
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
