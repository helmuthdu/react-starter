import { atom, RecoilState } from 'recoil';
import { User, UserScheme } from '../models/user';

export type UserState = UserScheme;

export const userState: RecoilState<UserState> = atom({
  key: 'userState', // unique ID (with respect to other atoms/selectors)
  default: new User() as UserState // default value (aka initial value)
});
