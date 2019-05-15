import { call, delay, fork, takeLatest } from 'redux-saga/effects';
import { ActionType } from './types';

// eslint-disable-next-line
function* handleLogin({ payload }: any) {
  try {
    const log = () => console.log(ActionType.USER_SET_USER, payload);
    yield delay(100);
    yield call(log);
  } catch (err) {
    console.log(err);
  }
}

function* watchLogin() {
  yield takeLatest(ActionType.USER_SET_USER, handleLogin);
}

export function* sagas() {
  yield fork(watchLogin);
}
