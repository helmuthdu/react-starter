import { User, UserSchema } from '../../models/user';

export type State = Readonly<UserSchema>;

export const initialState: State = new User();
