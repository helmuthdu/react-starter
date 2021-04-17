import { Dispatch } from 'react';
import { AppDispatch } from '../../../../stores';
import { actionAddError, actionDeleteErrors } from '../../../../stores/modules/errors';
import { usersApi } from '../../api';
import { User, UserSchema } from '../../models/user';
import { UserPayload } from './reducer';
import { UserActionTypes } from './types';

export type Action = {
  type: UserActionTypes;
  payload: UserPayload;
  callback?: () => void;
};

export const actionSignUp = (payload: UserSchema, callback?: () => void) => async (dispatch: Dispatch<AppDispatch>) => {
  try {
    const res = await usersApi.signUp(payload);
    dispatch({
      type: UserActionTypes.USER_SET_USER,
      payload: { ...res },
      callback
    });
    dispatch(actionDeleteErrors());
  } catch (err) {
    dispatch(actionAddError({ signUpAlreadyExists: true }));
  }
};

export const actionSignIn = (payload: UserSchema, callback?: () => void) => async (dispatch: Dispatch<AppDispatch>) => {
  try {
    const res = await usersApi.signIn(payload);
    dispatch({
      type: UserActionTypes.USER_SET_USER,
      payload: { ...res.data },
      callback
    });
    dispatch(actionDeleteErrors());
  } catch (err) {
    if (err.status === 409) {
      dispatch(actionAddError({ signInNotFound: true }));
    } else {
      dispatch(actionAddError({ signInWrongInput: true }));
    }
  }
};

export const actionSignOut = (callback?: () => void): Action => ({
  type: UserActionTypes.USER_SET_USER,
  payload: new User(),
  callback
});

const actions = {
  actionSignUp,
  actionSignIn,
  actionSignOut
};

export default actions;
