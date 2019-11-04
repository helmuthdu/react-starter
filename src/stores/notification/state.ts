import { Notification } from '../../models/notification/notification.interface';

export type State = Readonly<Notification>;

export const initialState: State = {
  message: '',
  timeout: 5000,
  type: undefined
};
