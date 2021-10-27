import React, { lazy, Suspense, useEffect } from 'react';
import { RouteObject, useRoutes } from 'react-router';
import isEqual from 'lodash/isEqual';
import { IntlProvider } from 'react-intl';
import { Http } from '../utils';
import { useStorage } from '../hooks/storage.hook';
import { BrowserRouter } from 'react-router-dom';

export type Locale = typeof locales[keyof typeof locales];
export type LocaleMessages = { locale: Locale; messages: Record<string, any> };

export const locales = {
  english: 'en-US'
} as const;

export const isLanguageSupported = (locale: Locale): boolean => Object.values(locales).includes(locale);

const loadTranslationsAsync = async (locale: Locale): Promise<Record<string, string> | undefined> =>
  await Http.get<Record<string, string>>(`${process.env.PUBLIC_URL}/locales/${locale}.json`);

const AppI18n: React.FC<{ locale: Locale }> = ({ locale, children }) => {
  const [localeStorage, setLocaleStorage] = useStorage<LocaleMessages>('locale', { locale, messages: {} });

  useEffect(() => {
    loadTranslationsAsync(locale).then((res = {}) => {
      if (!isEqual(localeStorage.messages, res)) {
        setLocaleStorage({ locale, messages: res });
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <IntlProvider locale={locale} messages={localeStorage.messages} onError={() => undefined}>
      {children}
    </IntlProvider>
  );
};

const AppRoutes: React.FC<{ routes: RouteObject[] }> = ({ routes }) => {
  const locale = window.location.pathname.split('/')[1] as Locale;

  useEffect(() => {
    if (!locale || !isLanguageSupported(locale)) {
      window.location.href = `/${locales.english}/`;
    }
    // eslint-disable-next-line
  }, []);

  const updatePath = (route: RouteObject) => {
    if (route.path?.includes(locale) || route.index) {
      return route;
    }

    if (route.children && route.children.length > 0) {
      route.children = route.children.map(updatePath);
    }

    route.path = `/${locale}/${route.path?.startsWith('/') ? route.path?.substring(1) : route.path}`;
    return route;
  };

  const NotFoundRoute = lazy(() => import('./not-found/not-found.route'));

  const component = useRoutes([
    ...routes.map(updatePath),
    {
      path: '*',
      element: <NotFoundRoute />
    }
  ]);

  return (
    <AppI18n locale={locale}>
      <Suspense fallback={null}>{component}</Suspense>
    </AppI18n>
  );
};

export const AppRouter: React.FC<{ routes: RouteObject[] }> = ({ routes }) => {
  return (
    <BrowserRouter>
      <AppRoutes routes={routes} />
    </BrowserRouter>
  );
};

export default AppRouter;
