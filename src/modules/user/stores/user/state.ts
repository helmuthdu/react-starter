import { UserScheme, User } from '../../models/user';

export type State = Readonly<UserScheme>;

export const initialState: State = new User();
