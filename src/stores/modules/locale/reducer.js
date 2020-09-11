import { SupportedLanguages } from './state';
import { LocaleActionTypes } from './types';

export const reducer = {
  [LocaleActionTypes.LOCALE_SET_LANGUAGE]: (state, payload) => ({
    ...state,
    locale: {
      ...state.locale,
      language: payload.language || SupportedLanguages.English
    }
  }),
  [LocaleActionTypes.LOCALE_SET_MESSAGES]: (state, payload) => ({
    ...state,
    locale: {
      ...state.locale,
      messages: payload.messages || {}
    }
  })
};
