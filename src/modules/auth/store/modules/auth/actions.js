import { authApi } from '../../../api/auth.api';
import { ActionType } from './types';

export const actions = {
  getUser: () => async dispatch =>
    dispatch({
      type: ActionType.AUTH_SET_USER,
      payload: {
        ...(await authApi.get())
      }
    }),
  doLogout: () => dispatch =>
    dispatch({
      type: ActionType.AUTH_SET_USER,
      payload: { name: '', username: '', email: '', isLogged: false, token: '' }
    }),
  doLogin: payload => async dispatch =>
    dispatch({
      type: ActionType.AUTH_SET_USER,
      payload: {
        ...(await authApi.post(payload)).data,
        isLogged: true
      }
    })
};
