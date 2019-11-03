import { Http } from '../../utils/http.util';
import { Action } from './reducer';
import { SupportedLanguages } from './state';
import { LocaleActionTypes } from './types';

export const actionGetMessages = async (payload: string): Promise<Action> => ({
  type: LocaleActionTypes.SET_LOCALE_MESSAGES,
  payload: { messages: (await Http.get({ url: `/locales/${payload}.json` })).data }
});

export const actionSetLocale = (payload = SupportedLanguages.English): Action => ({
  type: LocaleActionTypes.SET_LOCALE_LANGUAGE,
  payload: { language: payload }
});

export default {
  actionSetLocale
};
