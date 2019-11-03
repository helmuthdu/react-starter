import { Http } from '../../../utils/http.util';
import { LocaleActionTypes } from './types';

export const actionGetMessages = async (payload: string) => ({
  type: LocaleActionTypes.SET_LOCALE_MESSAGES,
  payload: (await Http.get({ url: `/locales/${payload}.json` })).data
});

export const actionSetLocale = (payload: string) => ({
  type: LocaleActionTypes.SET_LOCALE_LANGUAGE,
  payload
});

export default {
  actionSetLocale
};
