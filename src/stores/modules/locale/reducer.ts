import { Action } from './actions';
import { initialState, State, SupportedLanguages } from './state';
import { ActionTypes } from './types';

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.LOCALE_SET_LANGUAGE:
      return {
        ...state,
        language: action.payload.language || SupportedLanguages.English
      };
    case ActionTypes.LOCALE_SET_MESSAGES:
      return {
        ...state,
        messages: action.payload.messages || {}
      };
    default:
      return state;
  }
};
