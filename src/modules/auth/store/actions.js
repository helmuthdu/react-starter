// @flow
import { authApi, AuthenticatePayload } from '../api/auth.api';
import { AUTH_SET_USER } from './types';

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

export const doLogout = () => dispatch =>
  dispatch({
    type: AUTH_SET_USER,
    payload: { username: '', email: '', isLogged: false, token: '' }
  });
