import { NotificationSchema } from '../../../models/notification/notification.schema';
import { NotificationActionTypes } from './types';

export type Action = {
  type: NotificationActionTypes;
  payload?: NotificationSchema;
  callback?: () => void;
};

export const actionAddNotification = (payload: NotificationSchema, callback?: () => void): Action => ({
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

const actions = {
  actionAddNotification,
  actionDeleteNotification,
  actionNextNotification
};

export default actions;
