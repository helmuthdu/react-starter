import { atom, RecoilState } from 'recoil';
import { User } from '../models/user';

export type UserState = User;

export const userStore: RecoilState<UserState> = atom({
  key: 'User',
  default: User.create()
});
