import React, { lazy, Suspense } from 'react';
import { IntlProvider } from 'react-intl';
import { RouteObject, useRoutes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { addLocaleToRoutePath, isLanguageSupported, Locale, useLocale } from '../locales';

const AppI18n: React.FC<{ locale: Locale; children: any }> = ({
  locale,
  children
}: {
  locale: Locale;
  children: React.ReactElement;
}) => {
  const [localeStorage] = useLocale(locale);

  return (
    <IntlProvider locale={localeStorage.locale} messages={localeStorage.messages} onError={() => undefined}>
      {children}
    </IntlProvider>
  );
};

const AppRoutes: React.FC<{ routes: RouteObject[] }> = ({ routes }: { routes: RouteObject[] }) => {
  const NotFoundRoute = lazy(() => import('./not-found/not-found.route'));

  const component = useRoutes([
    ...routes.map(addLocaleToRoutePath),
    {
      path: 'not-found',
      element: <NotFoundRoute />
    },
    {
      path: '*',
      element: <NotFoundRoute />
    }
  ]);

  return <Suspense fallback={null}>{component}</Suspense>;
};

export const AppRouter: React.FC<{ routes: RouteObject[] }> = ({ routes }: { routes: RouteObject[] }) => {
  const locale: any = window.location.pathname.split('/')[1];

  if (!isLanguageSupported(locale) && locale !== 'not-found') {
    window.location.href = `/not-found`;
  }

  return (
    <BrowserRouter>
      <AppI18n locale={locale}>
        <AppRoutes routes={routes} />
      </AppI18n>
    </BrowserRouter>
  );
};

export default AppRouter;
