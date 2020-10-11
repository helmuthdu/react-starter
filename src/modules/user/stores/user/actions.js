import { userApi } from '../../api/user.api';
import { UserActionTypes } from './types';

export const actionGetUser = async callback => ({
  type: UserActionTypes.USER_SET_USER,
  payload: {
    ...(await userApi.get())
  },
  callback
});

export const actionLogin = async (payload, callback) => ({
  type: UserActionTypes.USER_SET_USER,
  payload: {
    ...(await userApi.post(payload)).data,
    isLogged: true
  },
  callback
});

export const actionLogout = callback => ({
  type: UserActionTypes.USER_SET_USER,
  payload: { name: '', username: '', email: '', isLogged: false, token: '' },
  callback
});

const actions = {
  actionGetUser,
  actionLogin,
  actionLogout
};

export default actions;
