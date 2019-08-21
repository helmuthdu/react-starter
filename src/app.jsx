import React from 'react';
import { hot } from 'react-hot-loader';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { routes, stores } from './modules';
import AppRouter from './routes';
import createStore from './stores';
import * as rootStores from './stores/modules';

const { store, history } = createStore([...Object.values(rootStores), ...stores]);

const App = () => (
  <IntlProvider locale="en">
    <Provider store={store}>
      <AppRouter history={history} routes={routes} />
    </Provider>
  </IntlProvider>
);

export default process.env.NODE_ENV === 'development' ? hot(module)(App) : App;
