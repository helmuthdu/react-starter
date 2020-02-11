import React, { useEffect, useMemo } from 'react';
import { hot } from 'react-hot-loader/root';
import { IntlProvider } from 'react-intl';
import { Provider, shallowEqual, useDispatch, useSelector } from 'react-redux';
import { routes, State, stores } from './modules';
import AppRouter from './routes';
import createStore from './stores';
import { State as RootState, stores as rootStores } from './stores/modules';
import { actionGetMessages } from './stores/modules/locale';

const { store, history } = createStore([...rootStores, ...stores]);

export type AppState = State & RootState;

const AppContent = () => {
  const { language, messages } = useSelector(
    (state: AppState) => ({
      language: state.locale.language,
      messages: state.locale.messages
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionGetMessages(language));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return useMemo(
    () => (
      <IntlProvider locale={language} messages={messages}>
        <AppRouter history={history} routes={routes} />
      </IntlProvider>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [language, messages]
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
