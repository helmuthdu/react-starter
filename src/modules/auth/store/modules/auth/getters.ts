import { AppState } from '../../../../../pages/_app';
import { State } from './state';

export type Getters = {
  getCurrentUser: (state: AppState) => State;
};

export const getters: Getters = {
  getCurrentUser: (state: AppState) => state.auth
};
