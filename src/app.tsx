import React, { useEffect, useMemo } from 'react';
import { hot } from 'react-hot-loader/root';
import { IntlProvider } from 'react-intl';
import { RecoilRoot, useRecoilState } from 'recoil';
import { Notification } from './components/components/notification/notification';
import { routes } from './modules';
import AppRouter from './routes';
import { fetchLocaleMessages, selectLocale } from './stores/locale.state';

export const Container = () => {
  const [{ language, messages }, setLocale] = useRecoilState(selectLocale);

  useEffect(() => {
    fetchLocaleMessages(language).then((messages = {}) => {
      setLocale(locale => ({ ...locale, messages }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return useMemo(
    () => (
      <IntlProvider locale={language} messages={messages}>
        <AppRouter routes={routes} />
        <Notification />
      </IntlProvider>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [messages]
  );
};

const App = () => (
  <RecoilRoot>
    <Container />
  </RecoilRoot>
);

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
