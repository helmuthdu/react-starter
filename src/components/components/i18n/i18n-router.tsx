import React, { useEffect, useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { useStore } from '../../../stores';
import { actionGetMessages, SupportedLanguages } from '../../../stores/modules/locale';

export const isLanguageSupported = (lang: SupportedLanguages): boolean =>
  Object.values(SupportedLanguages).includes(lang);

export const I18nRouter: React.FC = ({ children }) => {
  const [
    {
      locale: { language, messages }
    },
    dispatch
  ] = useStore();

  useEffect(() => {
    dispatch(actionGetMessages(language));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return useMemo(
    () => (
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
