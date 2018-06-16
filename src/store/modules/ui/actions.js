import { UI_DISABLE_LOADING, UI_ENABLE_LOADING } from './types';

export const enableLoading = () => ({ type: UI_ENABLE_LOADING });
export const disableLoading = () => ({ type: UI_DISABLE_LOADING });
