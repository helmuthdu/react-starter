import { State as AppState } from '../../';
import { State } from './state';

export interface Selectors {
  getCurrentUser: (state: AppState) => State;
}

export const selectors: Selectors = {
  getCurrentUser: (state: AppState) => state.auth
};
