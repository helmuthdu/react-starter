import { AppState } from '../../../stores';

export interface Selectors {
  isLoading: (state: AppState) => boolean;
}

export const selectors: Selectors = {
  isLoading: (state: AppState) => state.loading.count > 0
};
