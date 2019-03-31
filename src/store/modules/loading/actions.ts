import { Action } from './reducer';
import { ActionType } from './types';

export interface Actions {
  actionDisableLoading: () => Action;
  actionEnableLoading: () => Action;
  actionToggleLoading: () => Action;
}

export const actions: Actions = {
  actionDisableLoading: () => ({ type: ActionType.LOADING_DISABLE_LOADING }),
  actionEnableLoading: () => ({ type: ActionType.LOADING_ENABLE_LOADING }),
  actionToggleLoading: () => ({ type: ActionType.LOADING_TOGGLE_LOADING })
};
