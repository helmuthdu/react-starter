import moize from 'moize';
import { AppState } from '../../../../stores';
import { State } from './state';

export const getUserName = moize(
  (state: State) => {
    console.log('getUserName');
    return state.username;
  },
  { isDeepEqual: true }
);

export interface Selectors {
  getUserName: (state: AppState) => string;
}

export const selectors: Selectors = {
  getUserName: (state: AppState) => getUserName(state.user)
};
