import { Http } from '../utils';
import { useStorage } from '../hooks/storage.hook';
import isEqual from 'lodash/isEqual';
import { useEffect } from 'react';
import { RouteObject } from 'react-router';

export type Locale = typeof locales[keyof typeof locales];
export type LocaleMessages = { locale: Locale; messages: Record<string, any> };

export const locales = {
  english: 'en-US'
} as const;

export const setLocale = (locale: Locale): Locale => {
  Http.setHeaders({ 'Accept-Language': locale });
  (document.querySelector('html') as HTMLElement).setAttribute('lang', locale);
  return locale;
};

export const isLanguageSupported = (lang: Locale): boolean => Object.values(locales).includes(lang);

export const useLocale = (locale: Locale): [LocaleMessages] => {
  const [localeStorage, setLocaleStorage] = useStorage<LocaleMessages>('locale', { locale, messages: {} });

  useEffect(() => {
    if (isLanguageSupported(locale)) {
      import(`./messages/${locale}.json`).then(({ default: messages }) => {
        if (!messages) {
          throw new Error('Empty translation file');
        } else if (!isEqual(localeStorage.messages, messages)) {
          setLocaleStorage({ locale, messages });
        }
      });
    }
    // eslint-disable-next-line
  }, [locale]);

  return [localeStorage];
};

export const addLocaleToRoutePath = (route: RouteObject) => {
  if (route.path?.includes(`/:locale/`) || route.index) {
    return route;
  }

  if (route.children && route.children.length > 0) {
    route.children = route.children.map(addLocaleToRoutePath);
  }

  route.path = `/:locale/${route.path?.startsWith('/') ? route.path?.substring(1) : route.path}`;
  return route;
};
