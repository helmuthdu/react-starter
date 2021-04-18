import isEqual from 'lodash/isEqual';
import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loadTranslationsAsync, localeState, SupportedLanguages } from '../../../stores/locale.store';

export const isLanguageSupported = (lang: SupportedLanguages): boolean =>
  Object.values(SupportedLanguages).includes(lang);

export const I18nRouter: React.FC = ({ children }) => {
  const [{ locale, messages }, setLocale] = useRecoilState(localeState);

  useEffect(() => {
    loadTranslationsAsync(locale).then((res = {}) => {
      if (!isEqual(messages, res)) {
        setLocale(state => ({ ...state, messages: res }));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Waiting translation to be loaded before processed
  if (Object.keys(messages).length === 0) return null;

  return (
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

          return (
            <IntlProvider locale={lang} messages={messages} onError={() => undefined}>
              {children}
            </IntlProvider>
          );
        }}
      </Route>
    </BrowserRouter>
  );
};
