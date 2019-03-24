import { AppState } from '../../../module';

export type Getters = {
  isLoading: (state: AppState) => boolean;
};

export const getters: Getters = {
  isLoading: (state: AppState) => state.loading.count > 0
};
