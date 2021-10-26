import React, { Suspense, useEffect } from 'react';
import { RouteObject, useRoutes } from 'react-router';
import isEqual from 'lodash/isEqual';
import { IntlProvider } from 'react-intl';
import { Http } from '../utils';
import { useStorage } from '../hooks/storage.hook';
import { NotFoundRoute } from './not-found/not-found.route';

export type Locale = typeof locales[keyof typeof locales];
export type LocaleMessages = { locale: Locale; messages: Record<string, any> };

export const locales = {
  english: 'en-US'
} as const;

export const isLanguageSupported = (locale: Locale): boolean => Object.values(locales).includes(locale);

const loadTranslationsAsync = async (locale: Locale): Promise<Record<string, string> | undefined> =>
  await Http.get<Record<string, string>>(`${process.env.PUBLIC_URL}/locales/${locale}.json`);

export const AppRouter = ({ routes }: { routes: RouteObject[] }) => {
  const locale = window.location.pathname.split('/')[1] as Locale;
  const [localeStorage, setLocaleStorage] = useStorage<LocaleMessages>('locale', { locale, messages: {} });

  useEffect(() => {
    if (!locale || !isLanguageSupported(locale)) {
      window.location.href = `/${locales.english}/`;
    }

    loadTranslationsAsync(locale).then((res = {}) => {
      if (!isEqual(localeStorage.messages, res)) {
        setLocaleStorage({ locale, messages: res });
      }
    });
    // eslint-disable-next-line
  }, []);

  const routesComponent = useRoutes([
    ...routes.map(route => {
      const isFallbackRoute = route.path === '*';

      if (route.path?.includes(locale)) {
        return route;
      }

      route.path = isFallbackRoute ? route.path : `${locale}/${route.path}`;
      return route;
    }),
    {
      path: '*',
      element: <NotFoundRoute />
    }
  ]);

  return (
    <IntlProvider locale={locale} messages={localeStorage.messages} onError={() => undefined}>
      <Suspense fallback={null}>{routesComponent}</Suspense>
    </IntlProvider>
  );
};

export default AppRouter;
