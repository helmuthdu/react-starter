import { Action } from './reducer';
import { ActionType } from './types';

export type Actions = {
  enableLoading: () => Action;
  disableLoading: () => Action;
  toggleLoading: () => Action;
};

export const actions: Actions = {
  enableLoading: () => ({ type: ActionType.UI_ENABLE_LOADING }),
  disableLoading: () => ({ type: ActionType.UI_DISABLE_LOADING }),
  toggleLoading: () => ({ type: ActionType.UI_TOGGLE_LOADING })
};
