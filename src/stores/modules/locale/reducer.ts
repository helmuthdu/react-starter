import { AppState } from '../../index';
import { State, SupportedLanguages } from './state';
import { LocaleActionTypes } from './types';

export type LocalePayload = Partial<State>;

export type Reducer = {
  [LocaleActionTypes.LOCALE_SET_LANGUAGE]: (state: AppState, payload: LocalePayload) => AppState;
  [LocaleActionTypes.LOCALE_SET_MESSAGES]: (state: AppState, payload: LocalePayload) => AppState;
};

export const reducer: Reducer = {
  [LocaleActionTypes.LOCALE_SET_LANGUAGE]: (state: AppState, payload: LocalePayload) => ({
    ...state,
    locale: {
      ...state.locale,
      language: payload.language || SupportedLanguages.English
    }
  }),
  [LocaleActionTypes.LOCALE_SET_MESSAGES]: (state: AppState, payload: LocalePayload) => ({
    ...state,
    locale: {
      ...state.locale,
      messages: payload.messages || {}
    }
  })
};
