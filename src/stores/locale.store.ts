import { atom, RecoilState, selector } from 'recoil';
import { Http } from '../utils';

const STORE_ID = 'Locale';

export enum SupportedLanguages {
  English = 'en'
}

export type Locale = {
  language: SupportedLanguages;
  messages: Record<string, string>;
};

export const localeState: RecoilState<Locale> = atom({
  key: STORE_ID,
  default: {
    language: SupportedLanguages.English,
    messages: JSON.parse(localStorage.getItem(STORE_ID) ?? '{}')
  }
});

export const localeStore = selector<Locale>({
  key: 'LocaleStore',
  get: ({ get }) => {
    return get(localeState);
  },
  set: ({ set }, payload) => {
    set(localeState, state => {
      const locale = { ...state, ...payload };
      localStorage.setItem(STORE_ID, JSON.stringify(locale));
      return locale;
    });
  }
});

export const fetchLocaleMessages = async (language: SupportedLanguages): Promise<Record<string, string> | undefined> =>
  (await Http.get<Record<string, string>>({ url: `${process.env.PUBLIC_URL}/locales/${language}.json` })).data;
