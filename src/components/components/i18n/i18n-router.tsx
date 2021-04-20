import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { isLanguageSupported, SupportedLanguages } from './i18n-config';
import { I18nProvider } from './i18n-provider';

export const I18nRouter: React.FC = ({ children }) => (
  <BrowserRouter>
    <Route path="/:lang([a-zA-Z]{2}-[a-zA-Z]{2})">
      {({ match, location }) => {
        const { pathname } = location;
        const lang: SupportedLanguages = (match?.params as any)?.lang ?? SupportedLanguages.English;

        if (!pathname.includes(`/${lang}/`)) {
          return <Redirect to={`/${lang}/`} />;
        } else if (!isLanguageSupported(lang)) {
          return <Redirect to={`/${SupportedLanguages.English}/`} />;
        }

        return <I18nProvider locale={lang}>{children}</I18nProvider>;
      }}
    </Route>
  </BrowserRouter>
);
