import { AppState } from '../../../index';

export const isLoading = (state: AppState) => state.ui.loading > 0;
