import { Dispatch } from 'redux';
import { userApi, UserRequest } from '../../../api/user.api';
import { Action } from './reducer';
import { ActionType } from './types';

export interface Actions {
  actionGetUser: () => (dispatch: Dispatch<Action>) => Promise<Action>;
  actionLogin: (payload: UserRequest) => (dispatch: Dispatch<Action>) => Promise<Action>;
  actionLogout: () => (dispatch: Dispatch<Action>) => Action;
}

export const actions: Actions = {
  actionGetUser: () => async (dispatch: Dispatch<Action>) =>
    dispatch({
      type: ActionType.USER_SET_USER,
      payload: {
        ...(await userApi.get())
      }
    }),
  actionLogin: (payload: UserRequest) => async (dispatch: Dispatch<Action>) =>
    dispatch({
      type: ActionType.USER_SET_USER,
      payload: {
        ...(await userApi.post(payload)).data,
        isLogged: true
      }
    }),
  actionLogout: () => (dispatch: Dispatch<Action>) =>
    dispatch({
      type: ActionType.USER_SET_USER,
      payload: { name: '', username: '', email: '', isLogged: false, token: '' }
    })
};
