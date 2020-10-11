import { NotificationActionTypes } from './types';

export const actionAddNotification = (payload, callback) => ({
  type: NotificationActionTypes.NOTIFICATION_ADD_MESSAGE,
  payload,
  callback
});

export const actionDeleteNotification = callback => ({
  type: NotificationActionTypes.NOTIFICATION_DELETE_MESSAGES,
  callback
});

export const actionNextNotification = callback => ({
  type: NotificationActionTypes.NOTIFICATION_NEXT_MESSAGE,
  callback
});

const actions = {
  actionAddNotification,
  actionDeleteNotification,
  actionNextNotification
};

export default actions;
