import { atom, RecoilState } from 'recoil';
import { Http } from '../utils';
import { localStorageEffect } from '../utils/localStorage.util';

const STORE_ID = 'Locale';

export enum SupportedLanguages {
  English = 'en'
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
  effects_UNSTABLE: [localStorageEffect('locales')]
});

export const fetchLocaleMessages = async (language: SupportedLanguages): Promise<Record<string, string> | undefined> =>
  (await Http.get<Record<string, string>>({ url: `${process.env.PUBLIC_URL}/locales/${language}.json` })).data;
