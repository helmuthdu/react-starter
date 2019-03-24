import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { routes, stores } from './module';
import AppRouter from './routes';
import createStore from './store';

const { store, history } = createStore(stores);

const App = () => (
  <Provider store={store}>
    <AppRouter history={history} routes={routes} />
  </Provider>
);

export default (process.env.NODE_ENV === 'development' ? hot(module)(App) : App);
