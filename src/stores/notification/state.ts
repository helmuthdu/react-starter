import { Notification } from '../../models/notification/notification.interface';

export type State = Readonly<Notification[]>;

export const initialState: State = [];
