import moize from 'moize';
import { AppState } from '../index';
import { State } from './state';

export const getCurrentLocale = moize((state: State) => state.language, { isDeepEqual: true });

export interface Selectors {
  getCurrentLocale: (state: AppState) => string;
}

export const selectors: Selectors = {
  getCurrentLocale: (state: AppState) => getCurrentLocale(state.locale)
};
