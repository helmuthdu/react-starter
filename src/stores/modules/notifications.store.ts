import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationSchema } from '../../entities/notification/notification.type';
import { uuid } from '../../utils/toolbox.util';
import { AppState } from '../index';

export type State = Readonly<{
  queue: string[];
  data: Record<string, NotificationSchema>;
}>;

export type NotificationPayload = NotificationSchema;

export const name = 'notifications';

export const initialState: State = {
  queue: [],
  data: {}
};

export const store = createSlice({
  name,
  initialState,
  reducers: {
    addNotificationAction: (state, action: PayloadAction<NotificationPayload>) => {
      const id = uuid();
      const notification = {
        ...action.payload,
        read: false,
        timeout: action.payload.timeout || 5000
      };

      state.queue.push(id);
      state.data[id] = notification;
    },
    resetNotificationsAction: state => {
      state.data = {};
    },
    showNextNotificationAction: state => {
      const notification = state.data[state.queue[0]];

      if (notification) {
        notification.read = true;
      }

      state.queue = state.queue.slice(1);
    }
  }
});

export const reducer = store.reducer;

export const notificationsSelector = createSelector(
  (state: AppState) => state,
  (state: AppState) => state.notifications.data
);
export const notificationsQueueSelector = createSelector(
  (state: AppState) => state,
  (state: AppState) => state.notifications.queue
);

export const { addNotificationAction, showNextNotificationAction, resetNotificationsAction } = store.actions;
