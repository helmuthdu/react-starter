import { State as AppState } from '../';

export interface Selectors {
  isLoading: (state: AppState) => boolean;
}

export const selectors: Selectors = {
  isLoading: (state: AppState) => state.loading.count > 0
};
