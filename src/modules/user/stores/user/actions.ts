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
  const res = await usersApi.signUp(payload);

  if (res.error) {
    dispatch(actionAddError({ signUpAlreadyExists: true }));
  } else if (res.data) {
    dispatch({
      type: UserActionTypes.USER_SET_USER,
      payload: { ...res.data },
      callback
    });
    dispatch(actionDeleteErrors());
  }
};

export const actionSignIn = (payload: UserSchema, callback?: () => void) => async (dispatch: Dispatch<AppDispatch>) => {
  const res = await usersApi.signIn(payload);

  if (res.error) {
    if (res.status === 409) {
      dispatch(actionAddError({ signInNotFound: true }));
    } else {
      dispatch(actionAddError({ signInWrongInput: true }));
    }
  } else if (res.data) {
    dispatch({
      type: UserActionTypes.USER_SET_USER,
      payload: { ...res.data },
      callback
    });
    dispatch(actionDeleteErrors());
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
