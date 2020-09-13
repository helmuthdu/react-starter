import { User, UserSchema } from '@/modules/user/models/user';

export type State = Readonly<UserSchema>;

export const initialState: State = new User();
