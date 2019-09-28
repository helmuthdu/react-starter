import { call, delay, fork, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from './types';

function* handleGetUser({ payload }: any) {
  try {
    const log = () => console.log(ActionTypes.USER_GET_USER, payload);
    yield delay(100);
    yield call(log);
  } catch (err) {
    console.log(err);
  }
}

function* handleLogin({ payload }: any) {
  try {
    const log = () => console.log(ActionTypes.USER_SET_USER, payload);
    yield delay(100);
    yield call(log);
  } catch (err) {
    console.log(err);
  }
}

function* watchGetUser() {
  yield takeLatest(ActionTypes.USER_GET_USER, handleLogin);
}

function* watchLogin() {
  yield takeLatest(ActionTypes.USER_SET_USER, handleLogin);
}

export function* sagas() {
  yield fork(watchGetUser);
  yield fork(watchLogin);
}
