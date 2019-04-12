import { State } from '../';

export interface Getters {
  isLoading: (state: State) => boolean;
}

export const getters: Getters = {
  isLoading: (state: State) => state.loading.count > 0
};
