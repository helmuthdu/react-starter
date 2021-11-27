import { atom, RecoilState, selector } from 'recoil';
import { localStorageEffect, loggerEffect } from '../../../effects';
import { User, UserSchema } from '../models/user';
import { UserRequestPayload, usersApi } from '../api';

enum RequestErrorType {
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  UserNotFound = 'USER_NOT_FOUND',
  UserInvalid = 'USER_INVALID'
}

export type State = {
  data?: UserSchema;
  status: 'idle' | 'pending' | 'completed';
  error?: RequestErrorType;
};

const STORE_ID = 'User';

export const initialState: State = {
  data: undefined,
  status: 'idle',
  error: undefined
};

export const userState: RecoilState<State> = atom({
  key: STORE_ID,
  default: initialState,
  effects_UNSTABLE: [localStorageEffect(STORE_ID), loggerEffect(STORE_ID.toUpperCase())]
});

export const signUpAction = async (payload: UserRequestPayload, setState: (state: (s: State) => State) => void) => {
  setState(state => ({
    data: undefined,
    status: 'pending',
    error: undefined
  }));
  try {
    const user = (await usersApi.signUp(payload)).data;
    setState(() => ({
      data: User.create(user),
      error: undefined,
      status: 'completed'
    }));
  } catch (err) {
    setState(() => ({
      data: User.create(),
      error: RequestErrorType.UserAlreadyExists,
      status: 'idle'
    }));
  }
};

export const signInAction = async (payload: UserRequestPayload, setState: (state: (s: State) => State) => void) => {
  setState(state => ({
    data: undefined,
    status: 'pending',
    error: undefined
  }));
  try {
    const user = (await usersApi.signIn(payload)).data;
    setState(() => ({
      data: User.create(user),
      error: undefined,
      status: 'completed'
    }));
  } catch (err: any) {
    setState(() => ({
      data: User.create(),
      error: err.status === 409 ? RequestErrorType.UserNotFound : RequestErrorType.UserInvalid,
      status: 'idle'
    }));
  }
};

export const isLoggedInSelector = selector({
  key: 'IsLoggedInSelector',
  get: ({ get }) => !!get(userState).data?.token
});
