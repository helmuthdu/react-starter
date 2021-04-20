export type LocaleMessages = { locale: SupportedLanguages; messages: Record<string, any> };

export enum SupportedLanguages {
  English = 'en-US'
}

export const LocaleStorageID = 'locale';
export const isLanguageSupported = (lang: SupportedLanguages): boolean =>
  Object.values(SupportedLanguages).includes(lang);
