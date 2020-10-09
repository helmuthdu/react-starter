import { NotificationSchema } from '../../../models/notification/notification.schema';

export type State = ReadonlyArray<NotificationSchema>;

export const initialState: State = [];
