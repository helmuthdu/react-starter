import { atom, RecoilState } from 'recoil';
import { localStorageEffect } from '../../../utils/localStorage.util';
import { User, UserSchema } from '../models/user';

const STORE_ID = 'User';

export type UserState = UserSchema;

export const userState: RecoilState<UserState> = atom({
  key: STORE_ID,
  default: User.create(),
  effects_UNSTABLE: [localStorageEffect('users')]
});
