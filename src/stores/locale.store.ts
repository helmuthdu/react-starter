import { atom, RecoilState } from 'recoil';
import { localStorageEffect, loggerEffect } from '../effects';
import { Http } from '../utils';

const STORE_ID = 'locale';

export enum SupportedLanguages {
  English = 'en-US'
}

export type Locale = {
  locale: SupportedLanguages;
  messages: Record<string, string>;
};

export const localeState: RecoilState<Locale> = atom({
  key: STORE_ID,
  default: {
    locale: SupportedLanguages.English,
    messages: {}
  },
  effects_UNSTABLE: [localStorageEffect(STORE_ID), loggerEffect(STORE_ID.toUpperCase())]
});

export const loadTranslationsAsync = async (
  language: SupportedLanguages
): Promise<Record<string, string> | undefined> =>
  await Http.get<Record<string, string>>(`${process.env.PUBLIC_URL}/locales/${language}.json`);
