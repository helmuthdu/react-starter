import React, { useEffect, useMemo } from 'react';
import { hot } from 'react-hot-loader/root';
import { IntlProvider } from 'react-intl';
import { Notification } from './components/components/notification/notification';
import { routes } from './modules';
import AppRouter from './routes';
import { StoreProvider, useStore } from './stores';
import { actionGetMessages } from './stores/locale';

const Container = () => {
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
  <StoreProvider logger={process.env.NODE_ENV === 'development'}>
    <Container />
  </StoreProvider>
);

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
