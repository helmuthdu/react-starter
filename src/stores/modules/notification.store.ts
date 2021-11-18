import moize from 'moize';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationSchema } from '../../models/notification/notification.interface';
import { AppState } from '../index';

export type State = Readonly<NotificationSchema[]>;
export type NotificationPayload = NotificationSchema;

export const name = 'notification';

export const initialState: State = [];

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    actionAddNotification: (state, action: PayloadAction<NotificationPayload>) => {
      state.push({
        ...action.payload,
        timeout: action.payload.timeout || 5000
      });
    },
    actionDeleteNotifications: () => [],
    actionNextNotification: state => {
      state.slice(1);
    }
  }
});

export const selectorNotification = moize((state: AppState) => state.notification, { isDeepEqual: true });

export const { actionAddNotification, actionNextNotification, actionDeleteNotifications } = slice.actions;

export const reducer = slice.reducer;

export type Reducer = typeof reducer;
