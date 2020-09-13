import { NotificationSchema } from '../../../models/notification/notification.interface';

export type State = Readonly<NotificationSchema[]>;

export const initialState: State = [];
