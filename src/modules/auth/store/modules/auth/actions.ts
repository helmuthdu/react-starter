import { Dispatch } from 'redux';
import { authApi, AuthenticatePayload } from '../../../api/auth.api';
import { ActionType } from './types';

export const getUserData = () => async (dispatch: Dispatch) =>
  dispatch({
    type: ActionType.AUTH_SET_USER,
    payload: {
      ...(await authApi.get())
    }
  });

export const doLogin = (payload: AuthenticatePayload) => async (dispatch: Dispatch) => {
  dispatch({
    type: ActionType.AUTH_SET_USER,
    payload: {
      ...(await authApi.post(payload)).data,
      isLogged: true
    }
  });
};

export const doLogout = () => (dispatch: Dispatch) =>
  dispatch({
    type: ActionType.AUTH_SET_USER,
    payload: { username: '', email: '', isLogged: false, token: '' }
  });
