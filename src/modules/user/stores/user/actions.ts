import { userApi, UserRequest } from '../../api';
import { UserActionTypes } from './types';

export const actionGetUser = async () => ({
  type: UserActionTypes.USER_SET_USER,
  payload: {
    ...(await userApi.get())
  }
});

export const actionLogin = async (payload: UserRequest) => ({
  type: UserActionTypes.USER_SET_USER,
  payload: {
    ...(await userApi.post(payload)).data,
    isLogged: true
  }
});

export const actionLogout = () => ({
  type: UserActionTypes.USER_SET_USER,
  payload: { name: '', username: '', email: '', isLogged: false, token: '' }
});

export default {
  actionGetUser,
  actionLogin,
  actionLogout
};
