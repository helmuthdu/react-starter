import moize from 'moize';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationSchema } from '../../models/notification/notification.interface';
import { AppState } from '../index';

export type State = Readonly<{
  loading: 'idle' | 'pending';
  entities: NotificationSchema[];
}>;

export type NotificationPayload = NotificationSchema;

export const name = 'notification';

export const initialState: State = {
  loading: 'idle',
  entities: []
};

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    actionAddNotification: (state, action: PayloadAction<NotificationPayload>) => {
      state.entities.push({
        ...action.payload,
        timeout: action.payload.timeout || 5000
      });
    },
    actionDeleteNotifications: state => {
      state.entities = [];
    },
    actionNextNotification: state => {
      state.entities.slice(1);
    }
  }
});

export const selectorNotification = moize((state: AppState) => state.notification.entities, { isDeepEqual: true });

export const { actionAddNotification, actionNextNotification, actionDeleteNotifications } = slice.actions;

export const reducer = slice.reducer;

export type Reducer = typeof reducer;
