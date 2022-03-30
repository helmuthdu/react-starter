import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationSchema } from '../../entities/notification/notification.type';
import { generateUniqueId } from '../../utils/security.util';
import { AppState } from '../index';

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

export const store = createSlice({
  name,
  initialState,
  reducers: {
    addNotificationAction: (state, action: PayloadAction<NotificationPayload>) => {
      const id = generateUniqueId();
      const notification = {
        ...action.payload,
        read: false,
        timeout: action.payload.timeout || 5000
      };
      state.queue.push(id);
      state.entities[id] = notification;
    },
    resetNotificationsAction: state => {
      state.entities = {};
    },
    showNextNotificationAction: state => {
      const notification = state.entities[state.queue[0]];
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
  (state: AppState) => state.notifications.entities
);
export const notificationsQueueSelector = createSelector(
  (state: AppState) => state,
  (state: AppState) => state.notifications.queue
);

export const { addNotificationAction, showNextNotificationAction, resetNotificationsAction } = store.actions;
