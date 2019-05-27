import { Action } from './reducer';
import { ActionTypes } from './types';

export interface Actions {
  actionDisableLoading: () => Action;
  actionEnableLoading: () => Action;
  actionToggleLoading: () => Action;
}

export const actionDisableLoading = () => ({ type: ActionTypes.LOADING_DISABLE_LOADING });
export const actionEnableLoading = () => ({ type: ActionTypes.LOADING_ENABLE_LOADING });
export const actionToggleLoading = () => ({ type: ActionTypes.LOADING_TOGGLE_LOADING });

export const actions: Actions = {
  actionDisableLoading,
  actionEnableLoading,
  actionToggleLoading
};
