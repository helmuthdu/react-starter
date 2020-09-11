import { NotificationScheme } from '../../../models/notification/notification.interface';

export type State = Readonly<NotificationScheme[]>;

export const initialState: State = [];
