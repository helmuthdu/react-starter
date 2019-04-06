import { authApi } from '../../../api/auth.api';
import { ActionType } from './types';

export const actions = {
  actionGetUser: () => async dispatch =>
    dispatch({
      type: ActionType.AUTH_SET_USER,
      payload: {
        ...(await authApi.get())
      }
    }),
  actionLogout: () => dispatch =>
    dispatch({
      type: ActionType.AUTH_SET_USER,
      payload: { name: '', username: '', email: '', isLogged: false, token: '' }
    }),
  actionLogin: payload => async dispatch =>
    dispatch({
      type: ActionType.AUTH_SET_USER,
      payload: {
        ...(await authApi.post(payload)).data,
        isLogged: true
      }
    })
};
