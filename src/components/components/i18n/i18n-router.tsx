import React, { useEffect, useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { loadTranslationsAsync, localeState, SupportedLanguages } from '../../../stores/locale.store';
import { useRecoilState } from 'recoil';

export const isLanguageSupported = (lang: SupportedLanguages): boolean =>
  Object.values(SupportedLanguages).includes(lang);

export const I18nRouter: React.FC = ({ children }) => {
  const [{ locale, messages }, setLocale] = useRecoilState(localeState);

  useEffect(() => {
    loadTranslationsAsync(locale).then((messages = {}) => {
      setLocale(state => ({ ...state, messages }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(
    () =>
      Object.keys(messages).length === 0 ? null : (
        <BrowserRouter>
          <Route path="/:lang([a-zA-Z]{2}-[a-zA-Z]{2})">
            {({ match, location }) => {
              const lang: SupportedLanguages = ((match ? match.params : { lang: SupportedLanguages.English }) as any)
                .lang;

              const { pathname } = location;

              if (!pathname.includes(`/${lang}/`)) {
                return <Redirect to={`/${lang}/`} />;
              } else if (!isLanguageSupported(lang)) {
                return <Redirect to={`/${SupportedLanguages.English}/`} />;
              }

              return (
                <IntlProvider locale={lang} messages={messages}>
                  {children}
                </IntlProvider>
              );
            }}
          </Route>
        </BrowserRouter>
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [messages]
  );
};
