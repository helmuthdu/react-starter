import { Dispatch } from 'redux';
import { Http } from '../../../utils/http.util';
import { State, SupportedLanguages } from './state';
import { LocaleActionTypes } from './types';

export type Action = {
  type: LocaleActionTypes;
  payload: Partial<State>;
  callback?: () => void;
};

export const actionGetMessages = (payload: string, callback?: () => void) => async (dispatch: Dispatch<Action>) =>
  dispatch({
    type: LocaleActionTypes.LOCALE_SET_MESSAGES,
    payload: {
      messages: (await Http.get({ url: `${process.env.PUBLIC_URL}/locales/${payload}.json` })).data as any
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
