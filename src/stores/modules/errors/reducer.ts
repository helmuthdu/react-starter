import { AppState } from '../../index';
import { State } from './state';
import { ErrorsActionTypes } from './types';

export type ErrorsPayload = Partial<State>;

export type Reducer = {
  [ErrorsActionTypes.ERRORS_ADD]: (state: AppState, payload: ErrorsPayload) => AppState;
  [ErrorsActionTypes.ERRORS_DELETE]: (state: AppState, payload: ErrorsPayload) => AppState;
};

export const reducer: Reducer = {
  [ErrorsActionTypes.ERRORS_ADD]: (state: AppState, payload: ErrorsPayload) => ({
    ...state,
    errors: {
      ...state.errors,
      ...payload
    }
  }),
  [ErrorsActionTypes.ERRORS_DELETE]: (state: AppState) => ({
    ...state,
    errors: {} as State
  })
};
