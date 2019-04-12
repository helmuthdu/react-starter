import { State as ModuleState } from '../..';
import { State } from './state';

export interface Getters {
  getCurrentUser: (state: ModuleState) => State;
}

export const getters: Getters = {
  getCurrentUser: (state: ModuleState) => state.auth
};
