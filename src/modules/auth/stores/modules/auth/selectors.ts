import { AppState } from '../../../../../pages/_app';
import { State } from './state';

export interface Selectors {
  getCurrentUser: (state: AppState) => State;
}

export const selectors: Selectors = {
  getCurrentUser: (state: AppState) => state.auth
};
