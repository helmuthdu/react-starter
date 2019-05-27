import { userApi } from '../../../api/user.api';
import { ActionTypes } from './types';

const actionGetUser = () => async dispatch =>
  dispatch({
    type: ActionTypes.USER_SET_USER,
    payload: {
      ...(await userApi.get())
    }
  });

const actionLogout = () => dispatch =>
  dispatch({
    type: ActionTypes.USER_SET_USER,
    payload: { name: '', username: '', email: '', isLogged: false, token: '' }
  });

const actionLogin = payload => async dispatch =>
  dispatch({
    type: ActionTypes.USER_SET_USER,
    payload: {
      ...(await userApi.post(payload)).data,
      isLogged: true
    }
  });

export const actions = {
  actionGetUser,
  actionLogout,
  actionLogin
};
