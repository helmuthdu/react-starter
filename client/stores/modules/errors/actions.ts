import { ErrorsPayload } from './reducer';
import { ErrorsActionTypes } from './types';

export type Action = {
  type: ErrorsActionTypes;
  payload?: ErrorsPayload;
  callback?: () => void;
};

export const actionAddError = (payload: ErrorsPayload, callback?: () => void): Action => ({
  type: ErrorsActionTypes.ERRORS_ADD,
  payload,
  callback
});

export const actionDeleteErrors = (callback?: () => void): Action => ({
  type: ErrorsActionTypes.ERRORS_DELETE,
  callback
});

export default {
  actionAddError,
  actionDeleteErrors
};
