import { INotification } from '../../models/notification/notification.interface';

export type State = Readonly<INotification>;

export const initialState: State = {
  message: '',
  timeout: 5000,
  type: undefined
};
