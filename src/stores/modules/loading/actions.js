import { ActionTypes } from './types';

const actionEnableLoading = () => ({ type: ActionTypes.LOADING_ENABLE });
const actionDisableLoading = () => ({ type: ActionTypes.LOADING_DISABLE });
const actionToggleLoading = () => ({ type: ActionTypes.LOADING_TOGGLE });

export const actions = {
  actionEnableLoading,
  actionDisableLoading,
  actionToggleLoading
};
