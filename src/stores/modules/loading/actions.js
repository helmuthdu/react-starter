import { ActionType } from './types';

export const actions = {
  actionEnableLoading: () => ({ type: ActionType.LOADING_ENABLE }),
  actionDisableLoading: () => ({ type: ActionType.LOADING_DISABLE }),
  actionToggleLoading: () => ({ type: ActionType.LOADING_TOGGLE })
};
