import { Dispatch } from 'redux';
import { Http } from '../../../utils/http.util';
import { State, SupportedLanguages } from './state';
import { ActionTypes } from './types';

export type Action = {
  type: ActionTypes;
  payload: Partial<State>;
  callback?: () => void;
};

export const actionGetMessages = (payload: string, callback?: () => void) => async (dispatch: Dispatch<Action>) =>
  dispatch({
    type: ActionTypes.LOCALE_SET_MESSAGES,
    payload: { messages: (await Http.get({ url: `${process.env.PUBLIC_URL}/locales/${payload}.json` })).data },
    callback
  });

export const actionSetLanguage = (payload = SupportedLanguages.English, callback?: () => void): Action => ({
  type: ActionTypes.LOCALE_SET_LANGUAGE,
  payload: { language: payload },
  callback
});

export default {
  actionGetMessages,
  actionSetLanguage
};
