import { Dispatch } from 'redux';
import { authApi, AuthRequest } from '../../../api/auth.api';
import { Action } from './reducer';
import { State } from './state';
import { ActionType } from './types';

export type Actions = {
  actionGetUser: () => (dispatch: Dispatch<Action>) => Promise<Action>;
  actionLogin: (payload: AuthRequest) => (dispatch: Dispatch<Action>) => Promise<Action>;
  actionLogout: () => (dispatch: Dispatch<Action>) => Action;
};

export const actions: Actions = {
  actionGetUser: () => async (dispatch: Dispatch<Action>) =>
    dispatch({
      type: ActionType.AUTH_SET_USER,
      payload: {
        ...(await authApi.get())
      } as State
    }),
  actionLogin: (payload: AuthRequest) => async (dispatch: Dispatch<Action>) =>
    dispatch({
      type: ActionType.AUTH_SET_USER,
      payload: {
        ...(await authApi.post(payload)).data,
        isLogged: true
      } as State
    }),
  actionLogout: () => (dispatch: Dispatch<Action>) =>
    dispatch({
      type: ActionType.AUTH_SET_USER,
      payload: { name: '', username: '', email: '', isLogged: false, token: '' } as State
    })
};
