import type { RouteObject } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { isLanguageSupported, type Locale } from '../../locales';
import { AppI18n } from '../app-i18n/app-i18n';
import { AppRoutes } from '../app-routes/app-routes';

export const AppRouter = ({ routes }: { routes: RouteObject[] }) => {
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
