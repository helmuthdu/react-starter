import { Dispatch } from 'redux';
import { userApi, UserRequest } from '../../../api/user.api';
import { Action } from './reducer';
import { ActionTypes } from './types';

export interface Actions {
  actionGetUser: () => (dispatch: Dispatch<Action>) => Promise<Action>;
  actionLogin: (payload: UserRequest) => (dispatch: Dispatch<Action>) => Promise<Action>;
  actionLogout: () => (dispatch: Dispatch<Action>) => Action;
}

export const actionGetUser = () => async (dispatch: Dispatch<Action>) =>
  dispatch({
    type: ActionTypes.USER_GET_USER,
    payload: {
      ...(await userApi.get())
    }
  });

export const actionLogin = (payload: UserRequest) => async (dispatch: Dispatch<Action>) =>
  dispatch({
    type: ActionTypes.USER_SET_USER,
    payload: {
      ...(await userApi.post(payload)),
      isLogged: true
    }
  });

export const actionLogout = () => (dispatch: Dispatch<Action>) =>
  dispatch({
    type: ActionTypes.USER_SET_USER,
    payload: { name: '', username: '', email: '', isLogged: false, token: '' }
  });

export const actions: Actions = {
  actionGetUser,
  actionLogin,
  actionLogout
};
