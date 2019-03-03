import { ActionType } from './types';

export const actions = {
  enableLoading: () => ({ type: ActionType.UI_ENABLE_LOADING }),
  disableLoading: () => ({ type: ActionType.UI_DISABLE_LOADING }),
  toggleLoading: () => ({ type: ActionType.UI_TOGGLE_LOADING })
};
