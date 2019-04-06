import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import { routes, stores } from './modules';
import AppRouter from './routes';
import createStore from './stores';

const { store, history } = createStore(stores);

const App = () => (
  <Provider store={store}>
    <AppRouter history={history} routes={routes} />
  </Provider>
);

export default (process.env.NODE_ENV === 'development' ? hot(module)(App) : App);
