import { atom, RecoilState } from 'recoil';
import { localStorageEffect, loggerEffect } from '../../../effects';
import { User, UserSchema } from '../models/user';

const STORE_ID = 'User';

export type UserState = UserSchema;

export const userState: RecoilState<UserState> = atom({
  key: STORE_ID,
  default: User.create(),
  effects_UNSTABLE: [localStorageEffect(STORE_ID), loggerEffect(STORE_ID.toUpperCase())]
});
