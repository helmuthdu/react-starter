import { atom, RecoilState, selector } from 'recoil';
import { localStorageEffect, loggerEffect } from '../../../effects';
import { UserRequestPayload, usersApi } from '../api';
import { User, UserSchema } from '../models/user';

enum RequestErrorType {
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  UserNotFound = 'USER_NOT_FOUND',
  UserInvalid = 'USER_INVALID'
}

export type State = {
  entity: UserSchema;
  status: 'idle' | 'pending' | 'completed';
  error?: RequestErrorType;
};

const STORE_ID = 'User';

export const initialState: State = {
  entity: User.create(),
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
    ...state,
    status: 'pending'
  }));
  try {
    const user = (await usersApi.signUp(payload)).data;
    setState(state => ({
      ...state,
      entity: User.create(user),
      status: 'completed'
    }));
  } catch (err) {
    setState(state => ({
      ...state,
      error: RequestErrorType.UserAlreadyExists,
      status: 'idle'
    }));
  }
};

export const signInAction = async (payload: UserRequestPayload, setState: (state: (s: State) => State) => void) => {
  setState(state => ({
    ...state,
    status: 'pending'
  }));
  try {
    const user = (await usersApi.signIn(payload)).data;
    setState(state => ({
      ...state,
      entity: User.create(user),
      status: 'completed'
    }));
  } catch (err: any) {
    setState(state => ({
      ...state,
      error: err.status === 409 ? RequestErrorType.UserNotFound : RequestErrorType.UserInvalid,
      status: 'idle'
    }));
  }
};

export const isLoggedInSelector = selector({
  key: 'IsLoggedInSelector',
  get: ({ get }) => !!get(userState).entity?.token
});
