import moize from 'moize';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationSchema } from '../../models/notification/notification.type';
import { AppState } from '../index';
import { generateUniqueId } from '../../utils/security.util';

export type State = Readonly<{
  queue: string[];
  entities: Record<string, NotificationSchema>;
}>;

export type NotificationPayload = NotificationSchema;

export const name = 'notifications';

export const initialState: State = {
  queue: [],
  entities: {}
};

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    actionAddNotification: (state, action: PayloadAction<NotificationPayload>) => {
      const id = generateUniqueId();
      const notification = {
        ...action.payload,
        read: false,
        timeout: action.payload.timeout || 5000
      };
      state.queue.push(id);
      state.entities[id] = notification;
    },
    actionDeleteAllNotifications: state => {
      state.entities = {};
    },
    actionNextNotification: state => {
      const notification = state.entities[state.queue[0]];
      if (notification) {
        notification.read = true;
      }
      state.queue = state.queue.slice(1);
    }
  }
});

export const selectorNotifications = moize((state: AppState) => state.notifications.entities, { isDeepEqual: true });
export const selectorNotificationsQueue = moize((state: AppState) => state.notifications.queue, { isDeepEqual: true });

export const { actionAddNotification, actionNextNotification, actionDeleteAllNotifications } = slice.actions;

export const reducer = slice.reducer;
