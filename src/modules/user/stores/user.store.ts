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
  entity: UserSchema;
  loading: 'idle' | 'pending' | 'completed';
  error?: RequestErrorType;
};

const STORE_ID = 'User';

export const initialState: State = {
  entity: User.create(),
  loading: 'idle',
  error: undefined
};

export const userState: RecoilState<State> = atom({
  key: STORE_ID,
  default: initialState,
  effects_UNSTABLE: [localStorageEffect(STORE_ID), loggerEffect(STORE_ID.toUpperCase())]
});

export const signUpAction = async (payload: UserRequestPayload, setState: (state: (s: State) => State) => void) => {
  setState(state => ({
    ...state,
    loading: 'pending'
  }));
  try {
    const user = (await usersApi.signUp(payload)).data;
    setState(() => ({
      entity: User.create(user),
      error: undefined,
      loading: 'completed'
    }));
  } catch (err) {
    setState(() => ({
      entity: User.create(),
      error: RequestErrorType.UserAlreadyExists,
      loading: 'idle'
    }));
  }
};

export const signInAction = async (payload: UserRequestPayload, setState: (state: (s: State) => State) => void) => {
  setState(state => ({
    ...state,
    loading: 'pending'
  }));
  try {
    const user = (await usersApi.signIn(payload)).data;
    setState(() => ({
      entity: User.create(user),
      error: undefined,
      loading: 'completed'
    }));
  } catch (err: any) {
    setState(() => ({
      entity: User.create(),
      error: err.status === 409 ? RequestErrorType.UserNotFound : RequestErrorType.UserInvalid,
      loading: 'idle'
    }));
  }
};

export const isLoggedInSelector = selector({
  key: 'IsLoggedInSelector',
  get: ({ get }) => !!get(userState).entity.token
});
