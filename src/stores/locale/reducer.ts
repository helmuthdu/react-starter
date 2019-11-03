import { AppState } from '../index';
import { State } from './state';
import { LocaleActionTypes } from './types';

type Payload = Partial<State>;

export type Action = {
  type: LocaleActionTypes;
  payload: Payload;
};

export type Reducer = {
  [LocaleActionTypes.SET_LOCALE_LANGUAGE]: (state: AppState, payload: Payload) => AppState;
  [LocaleActionTypes.SET_LOCALE_MESSAGES]: (state: AppState, payload: Payload) => AppState;
};

export const reducer: Reducer = {
  [LocaleActionTypes.SET_LOCALE_LANGUAGE]: (state: AppState, payload: Payload) => ({
    ...state,
    locale: {
      ...state.locale,
      language: payload.language || 'en'
    }
  }),
  [LocaleActionTypes.SET_LOCALE_MESSAGES]: (state: AppState, payload: Payload) => ({
    ...state,
    locale: {
      ...state.locale,
      messages: payload.messages || {}
    }
  })
};
