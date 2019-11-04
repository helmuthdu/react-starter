import { userApi, UserRequest } from '../../api';
import { UserPayload } from './reducer';
import { UserActionTypes } from './types';

export type Action = {
  type: UserActionTypes;
  payload: UserPayload;
  callback?: () => void;
};

export const actionGetUser = async (callback?: () => void): Promise<Action> => ({
  type: UserActionTypes.USER_SET_USER,
  payload: {
    ...(await userApi.get())
  },
  callback
});

export const actionLogin = async (payload: UserRequest, callback?: () => void): Promise<Action> => ({
  type: UserActionTypes.USER_SET_USER,
  payload: {
    ...(await userApi.post(payload)).data,
    isLogged: true
  },
  callback
});

export const actionLogout = (callback?: () => void): Action => ({
  type: UserActionTypes.USER_SET_USER,
  payload: { name: '', username: '', email: '', isLogged: false, token: '' },
  callback
});

export default {
  actionGetUser,
  actionLogin,
  actionLogout
};
