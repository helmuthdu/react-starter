// @flow
import { authApi } from '../api/auth.api';
import { AUTH_SET_USER } from './types';
import { AuthenticatePayload } from '../api/auth.api';

export const getUserInfo = () => async dispatch =>
  dispatch({
    type: AUTH_SET_USER,
    payload: {
      ...(await authApi.get())
    }
  });

export const doLogin = (payload: AuthenticatePayload) => async dispatch => {
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
