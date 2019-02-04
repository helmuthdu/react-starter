import { AppState } from '../../../index';

export type Getters = {
  isLoading: (state: AppState) => boolean;
};

export const getters: Getters = {
  isLoading: (state: AppState) => state.ui.loading > 0
};
