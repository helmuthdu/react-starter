import { UI_DISABLE_LOADING, UI_ENABLE_LOADING, UI_TOGGLE_LOADING } from './types';

export const enableLoading = () => ({ type: UI_ENABLE_LOADING });
export const disableLoading = () => ({ type: UI_DISABLE_LOADING });
export const toggleLoading = () => ({ type: UI_TOGGLE_LOADING });
