import React, { useEffect, useMemo } from 'react';
import { hot } from 'react-hot-loader/root';
import { IntlProvider } from 'react-intl';
import { RecoilRoot, useRecoilState } from 'recoil';
import { Notification } from './components/components/notification/notification';
import { ErrorBoundary } from './components/utils/error-boundary/error-boundary';
import { routes } from './modules';
import AppRouter from './routes';
import { fetchLocaleMessages, localeStore } from './stores/locale.store';

export const I18n = ({ children }: any) => {
  const [{ locale, messages }, setLocale] = useRecoilState(localeStore);

  useEffect(() => {
    fetchLocaleMessages(locale).then((messages = {}) => {
      setLocale(state => ({ ...state, messages }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  return useMemo(
    () => (
      <IntlProvider locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [messages]
  );
};

const App = () => (
  <RecoilRoot>
    <ErrorBoundary>
      <I18n>
        <AppRouter routes={routes} />
        <Notification />
      </I18n>
    </ErrorBoundary>
  </RecoilRoot>
);

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
