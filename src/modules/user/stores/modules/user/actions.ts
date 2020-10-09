import { Dispatch } from 'redux';
import { userApi, UserRequest } from '../../../api';
import { UserSchema } from '../../../models/user';
import { Action } from './reducer';
import { ActionTypes } from './types';

export interface Actions {
  actionGetUser: (payload: UserRequest) => (dispatch: Dispatch<Action>) => Promise<Action>;
  actionSignIn: (payload: UserRequest) => (dispatch: Dispatch<Action>) => Promise<Action>;
  actionSignUp: (payload: UserRequest) => (dispatch: Dispatch<Action>) => Promise<Action>;
  actionLogout: () => (dispatch: Dispatch<Action>) => Promise<Action>;
}

export const actionGetUser = (payload: UserRequest) => async (dispatch: Dispatch<Action>) =>
  dispatch({
    type: ActionTypes.USER_SET_USER,
    payload: {
      ...(await userApi.signIn(payload))?.data
    } as UserSchema
  });

export const actionSignIn = (payload: UserRequest) => async (dispatch: Dispatch<Action>) =>
  dispatch({
    type: ActionTypes.USER_SET_USER,
    payload: {
      ...(await userApi.signIn(payload))?.data
    } as UserSchema
  });

export const actionSignUp = (payload: UserRequest) => async (dispatch: Dispatch<Action>) =>
  dispatch({
    type: ActionTypes.USER_SET_USER,
    payload: {
      ...(await userApi.signUp(payload))?.data
    } as UserSchema
  });

export const actionLogout = () => async (dispatch: Dispatch<Action>) =>
  dispatch({
    type: ActionTypes.USER_SET_USER,
    payload: { name: '', username: '', email: '', isLogged: false, token: '' }
  });

export const actions: Actions = {
  actionGetUser,
  actionSignIn,
  actionSignUp,
  actionLogout
};
