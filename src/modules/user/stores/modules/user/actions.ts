import { userApi, UserRequest } from '../../../api';
import { ActionTypes } from './types';

export const actionGetUser = async () => ({
  type: ActionTypes.USER_SET_USER,
  payload: {
    ...(await userApi.get())
  }
});

export const actionLogin = async (payload: UserRequest) => ({
  type: ActionTypes.USER_SET_USER,
  payload: {
    ...(await userApi.post(payload)).data,
    isLogged: true
  }
});

export const actionLogout = () => ({
  type: ActionTypes.USER_SET_USER,
  payload: { name: '', username: '', email: '', isLogged: false, token: '' }
});

export default {
  actionGetUser,
  actionLogin,
  actionLogout
};
