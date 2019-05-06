import { userApi } from '../../../api/user.api';
import { ActionType } from './types';

export const actions = {
  actionGetUser: () => async dispatch =>
    dispatch({
      type: ActionType.USER_SET_USER,
      payload: {
        ...(await userApi.get())
      }
    }),
  actionLogout: () => dispatch =>
    dispatch({
      type: ActionType.USER_SET_USER,
      payload: { name: '', username: '', email: '', isLogged: false, token: '' }
    }),
  actionLogin: payload => async dispatch =>
    dispatch({
      type: ActionType.USER_SET_USER,
      payload: {
        ...(await userApi.post(payload)).data,
        isLogged: true
      }
    })
};
