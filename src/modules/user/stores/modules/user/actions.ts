import { userApi, UserRequest } from '../../../api';
import { Action } from './reducer';
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

interface Actions {
  actionGetUser: () => Promise<Action>;
  actionLogin: (payload: UserRequest) => Promise<Action>;
  actionLogout: () => Action;
}

export const actions: Actions = {
  actionGetUser,
  actionLogin,
  actionLogout
};
