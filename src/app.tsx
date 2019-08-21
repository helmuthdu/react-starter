import React from 'react';
import { hot } from 'react-hot-loader';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { routes, State, stores } from './modules';
import AppRouter from './routes';
import createStore from './stores';
import { State as RootState, stores as rootStores } from './stores/modules';

const { store, history } = createStore([...rootStores, ...stores]);

export type AppState = State & RootState;

const App = () => (
  <IntlProvider locale="en">
    <Provider store={store}>
      <AppRouter history={history} routes={routes} />
    </Provider>
  </IntlProvider>
);

export default process.env.NODE_ENV === 'development' ? hot(module)(App) : App;
