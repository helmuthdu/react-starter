import { INotification } from '../../models/notification/notification.interface';
import { Action } from './reducer';
import { NotificationActionTypes } from './types';

export const actionDeleteNotification = (): Action => ({
  type: NotificationActionTypes.SET_NOTIFICATION,
  payload: {
    message: '',
    type: undefined
  }
});

export const actionSetNotification = (payload: INotification) => ({
  type: NotificationActionTypes.SET_NOTIFICATION,
  payload: payload
});

export default {
  actionDeleteNotification,
  actionSetNotification
};
