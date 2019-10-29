import { IUser, User } from '../../../models/user';

export type State = Readonly<IUser>;

export const initialState: State = new User();
