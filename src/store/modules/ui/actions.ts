import { ActionType } from './types';

export const enableLoading = () => ({ type: ActionType.UI_ENABLE_LOADING });
export const disableLoading = () => ({ type: ActionType.UI_DISABLE_LOADING });
export const toggleLoading = () => ({ type: ActionType.UI_TOGGLE_LOADING });
