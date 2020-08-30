import { User, UserScheme } from '../../../models/user';

export type State = Readonly<UserScheme>;

export const initialState: State = new User();
