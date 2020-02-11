import { Notification } from '../../../models/notification/notification.interface';

export type State = ReadonlyArray<Notification>;

export const initialState: State = [];
