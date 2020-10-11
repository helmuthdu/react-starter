import { Http } from '../../../utils/http.util';
import { SupportedLanguages } from './state';
import { LocaleActionTypes } from './types';

export const actionGetMessages = async (payload, callback) => ({
  type: LocaleActionTypes.LOCALE_SET_MESSAGES,
  payload: { messages: (await Http.get({ url: `/locales/${payload}.json` })).data },
  callback
});

export const actionSetLocale = (payload = SupportedLanguages.English, callback) => ({
  type: LocaleActionTypes.LOCALE_SET_LANGUAGE,
  payload: { language: payload },
  callback
});

const actions = {
  actionGetMessages,
  actionSetLocale
};

export default actions;
