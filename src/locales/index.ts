import { Http, Logger } from '../utils';
import { useStorage } from '../hooks/storage.hook';
import { useEffect } from 'react';
import { RouteObject } from 'react-router';

export type Locale = typeof locales[keyof typeof locales];
export type LocaleStorage = { locale: Locale; messages: any; version: string };

const APP_VERSION = process.env.REACT_APP_VERSION ?? '1.0.0';

export const locales = {
  english: 'en-US'
} as const;

export const configureLocale = (locale: Locale): Locale => {
  Http.setHeaders({ 'Accept-Language': locale });
  (document.querySelector('html') as HTMLElement).setAttribute('lang', locale);
  return locale;
};

export const isLanguageSupported = (lang: Locale): boolean => Object.values(locales).includes(lang);

export const useLocale = (locale: Locale): [LocaleStorage] => {
  const [localeStorage, setLocaleStorage] = useStorage<LocaleStorage>('locale', {
    locale,
    messages: {},
    version: '0.0.0'
  });

  useEffect(() => {
    if (localeStorage.locale === locale && localeStorage.version === APP_VERSION) {
      return;
    }

    if (!isLanguageSupported(locale)) {
      Logger.error('Locale not supported');
      return;
    }

    configureLocale(locale);

    if (localeStorage.messages[locale] && localeStorage.version === APP_VERSION) {
      setLocaleStorage({ ...localeStorage, locale });
    } else {
      import(`./messages/${locale}.json`)
        .then(({ default: messages }) => {
          if (!messages) {
            throw new Error('Empty translations file');
          }
          setLocaleStorage({
            locale,
            messages: { ...localeStorage.messages, [locale]: messages },
            version: APP_VERSION
          });
        })
        .catch(err => {
          throw err;
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
