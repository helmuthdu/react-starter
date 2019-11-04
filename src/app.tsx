import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { IntlProvider } from 'react-intl';
import { Notification } from './components/components/notification/notification';
import { StoreProvider, useStore } from './contexts/store/store.context';
import { routes } from './modules';
import AppRouter from './routes';
import { initialState, reducer } from './stores';
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

  return (
    <IntlProvider locale={language} messages={messages}>
      <AppRouter routes={routes} />
      <Notification />
    </IntlProvider>
  );
};

const App = () => (
  <StoreProvider initialState={initialState} reducer={reducer} logger={process.env.NODE_ENV === 'development'}>
    <Container />
  </StoreProvider>
);

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
