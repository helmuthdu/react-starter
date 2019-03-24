import { AppState } from '../../../../../module';
import { State } from './state';

export type Getters = {
  getCurrentUser: (state: AppState) => State;
};

export const getters: Getters = {
  getCurrentUser: (state: AppState) => state.auth
};
