import { call, delay, fork, takeLatest } from 'redux-saga/effects';
import { ActionType } from './types';

function* handleLogin({ payload }: any) {
  try {
    const log = () => console.log(ActionType.AUTH_SET_USER, payload);
    yield delay(100);
    yield call(log);
  } catch (err) {
    console.log(err);
  }
}

function* watchLogin() {
  yield takeLatest(ActionType.AUTH_SET_USER, handleLogin);
}

export function* sagas() {
  yield fork(watchLogin);
}
