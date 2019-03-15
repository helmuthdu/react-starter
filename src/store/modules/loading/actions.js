import { ActionType } from './types';

export const actions = {
  actionEnableLoading: () => ({ type: ActionType.UI_ENABLE_LOADING }),
  actionDisableLoading: () => ({ type: ActionType.UI_DISABLE_LOADING }),
  actionToggleLoading: () => ({ type: ActionType.UI_TOGGLE_LOADING })
};
