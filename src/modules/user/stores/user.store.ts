import { atom, RecoilState } from 'recoil';
import { User, UserSchema } from '../models/user';

export type UserState = UserSchema;

export const userState: RecoilState<UserState> = atom({
  key: 'userState', // unique ID (with respect to other atoms/selectors)
  default: new User() as UserState // default value (aka initial value)
});
