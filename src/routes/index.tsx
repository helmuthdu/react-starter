import { type JSXElementConstructor, type ReactElement, Suspense, lazy } from 'react';
import { IntlProvider } from 'react-intl';
import { type RouteObject, useRoutes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { type Locale, addLocaleToRoutePath, isLanguageSupported, useLocale } from '../locales';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const AppI18n: React.FC<{ locale: Locale; children: ReactElement<any, string | JSXElementConstructor<any>> }> = ({
  locale,
  children,
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
      element: <NotFoundRoute />,
    },
    {
      path: '*',
      element: <NotFoundRoute />,
    },
  ]);

  return <Suspense fallback={null}>{component}</Suspense>;
};

export const AppRouter: React.FC<{ routes: RouteObject[] }> = ({ routes }: { routes: RouteObject[] }) => {
  const locale = window.location.pathname.split('/')[1];

  if (!isLanguageSupported(locale as Locale) && locale !== 'not-found') {
    window.location.href = '/not-found';
  }

  return (
    <BrowserRouter>
      <AppI18n locale={locale as Locale}>
        <AppRoutes routes={routes} />
      </AppI18n>
    </BrowserRouter>
  );
};

export default AppRouter;
