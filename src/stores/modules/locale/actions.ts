import { Http } from '../../../utils';
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
  payload: {
    messages: (await Http.get(`${process.env.PUBLIC_URL}/locales/${payload}.json`)) as any
  },
  callback
});

export const actionSetLanguage = (payload = SupportedLanguages.English, callback?: () => void): Action => ({
  type: LocaleActionTypes.LOCALE_SET_LANGUAGE,
  payload: { language: payload },
  callback
});

const actions = {
  actionGetMessages,
  actionSetLanguage
};

export default actions;
