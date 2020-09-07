import { Http } from '../../utils/http.util';
import { LocalePayload } from './reducer';
import { SupportedLanguages } from './state';
import { LocaleActionTypes } from './types';

export type Action = {
  type: LocaleActionTypes;
  payload: LocalePayload;
  callback?: () => void;
};

export const actionGetMessages = async (payload: string, callback?: () => void): Promise<Action> => ({
  type: LocaleActionTypes.LOCALE_SET_MESSAGES,
  payload: { messages: (await Http.get({ url: `${process.env.PUBLIC_URL}/locales/${payload}.json` })).data },
  callback
});

export const actionSetLanguage = (payload = SupportedLanguages.English, callback?: () => void): Action => ({
  type: LocaleActionTypes.LOCALE_SET_LANGUAGE,
  payload: { language: payload },
  callback
});

export default {
  actionGetMessages,
  actionSetLanguage
};
