import { Dispatch } from 'redux';
import { authApi, AuthRequest } from '../../../api/auth.api';
import { Actions } from './actions';
import { Action } from './reducer';
import { State } from './state';
import { ActionType } from './types';

export type Actions = {
  getUser: () => (dispatch: Dispatch<Action>) => Promise<Action>;
  doLogout: () => (dispatch: Dispatch<Action>) => Action;
  doLogin: (payload: AuthRequest) => (dispatch: Dispatch<Action>) => Promise<Action>;
};

export const actions: Actions = {
  getUser: () => async (dispatch: Dispatch<Action>) =>
    dispatch({
      type: ActionType.AUTH_SET_USER,
      payload: {
        ...(await authApi.get())
      } as State
    }),
  doLogout: () => (dispatch: Dispatch<Action>) =>
    dispatch({
      type: ActionType.AUTH_SET_USER,
      payload: { name: '', username: '', email: '', isLogged: false, token: '' } as State
    }),
  doLogin: (payload: AuthRequest) => async (dispatch: Dispatch<Action>) =>
    dispatch({
      type: ActionType.AUTH_SET_USER,
      payload: {
        ...(await authApi.post(payload)).data,
        isLogged: true
      } as State
    })
};
