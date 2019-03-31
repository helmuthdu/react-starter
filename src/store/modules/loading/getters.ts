import { AppState } from '../../../pages/_app';

export interface Getters {
  isLoading: (state: AppState) => boolean;
}

export const getters: Getters = {
  isLoading: (state: AppState) => state.loading.count > 0
};
