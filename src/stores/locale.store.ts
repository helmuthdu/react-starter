import { atom, RecoilState } from 'recoil';
import { Http } from '../utils';

export enum SupportedLanguages {
  English = 'en'
}

export type Locale = {
  locale: SupportedLanguages;
  messages: Record<string, string>;
};

export const localeStore: RecoilState<Locale> = atom({
  key: 'Locale',
  default: {
    locale: SupportedLanguages.English,
    messages: {}
  }
});

export const fetchLocaleMessages = async (language: SupportedLanguages): Promise<Record<string, string> | undefined> =>
  (await Http.get<Record<string, string>>({ url: `${process.env.PUBLIC_URL}/locales/${language}.json` })).data;
