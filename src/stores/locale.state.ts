import { atom, RecoilState, selector } from 'recoil';
import { Http } from '../utils';

export enum SupportedLanguages {
  English = 'en'
}

export type Locale = {
  language: SupportedLanguages;
  messages: Record<string, string>;
};

export const localeState: RecoilState<Locale> = atom({
  key: 'LocaleState',
  default: {
    language: SupportedLanguages.English,
    messages: JSON.parse(localStorage.getItem('LocaleState') ?? '{}')
  }
});

export const getLocale = selector<Locale>({
  key: 'GetLocaleMessages',
  get: ({ get }) => {
    const { language, messages } = get(localeState);
    return { language, messages };
  },
  set: ({ set }, payload) => {
    set(localeState, state => {
      localStorage.setItem('LocaleState', JSON.stringify({ ...state, ...payload }));
      return { ...state, ...payload };
    });
  }
});

export const fetchLocaleMessages = async (language: SupportedLanguages): Promise<Record<string, string>> => {
  return (await Http.get({ url: `${process.env.PUBLIC_URL}/locales/${language}.json` })).data;
};
