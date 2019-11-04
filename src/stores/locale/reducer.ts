import { AppState } from '../index';
import { State, SupportedLanguages } from './state';
import { LocaleActionTypes } from './types';

export type LocalePayload = Partial<State>;

export type Reducer = {
  [LocaleActionTypes.SET_LOCALE_LANGUAGE]: (state: AppState, payload: LocalePayload) => AppState;
  [LocaleActionTypes.SET_LOCALE_MESSAGES]: (state: AppState, payload: LocalePayload) => AppState;
};

export const reducer: Reducer = {
  [LocaleActionTypes.SET_LOCALE_LANGUAGE]: (state: AppState, payload: LocalePayload) => ({
    ...state,
    locale: {
      ...state.locale,
      language: payload.language || SupportedLanguages.English
    }
  }),
  [LocaleActionTypes.SET_LOCALE_MESSAGES]: (state: AppState, payload: LocalePayload) => ({
    ...state,
    locale: {
      ...state.locale,
      messages: payload.messages || {}
    }
  })
};
