import { Action } from './reducer';
import { ActionType } from './types';

export type Actions = {
  enableLoading: () => Action;
  disableLoading: () => Action;
  toggleLoading: () => Action;
};

export const actions: Actions = {
  enableLoading: () => ({ type: ActionType.LOADING_ENABLE_LOADING }),
  disableLoading: () => ({ type: ActionType.LOADING_DISABLE_LOADING }),
  toggleLoading: () => ({ type: ActionType.LOADING_TOGGLE_LOADING })
};
