// @flow
import { authApi } from '../api/auth.api';
import { State } from './state';
import { AUTH_SET_USER } from './types';

export const getUserInfo = () => async dispatch =>
  dispatch({
    type: AUTH_SET_USER,
    payload: {
      ...(await authApi.get())
    }
  });

export const doLogin = (payload: State) => async dispatch => {
  dispatch({
    type: AUTH_SET_USER,
    payload: {
      ...(await authApi.post(payload)).data,
      isLogged: true
    }
  });
};

export const doLogout = () => {
  return {
    type: AUTH_SET_USER,
    payload: { username: '', email: '', isLogged: false, token: '' }
  };
};
