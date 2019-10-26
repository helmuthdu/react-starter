import React from 'react';
import { hot } from 'react-hot-loader';
import { IntlProvider } from 'react-intl';
import { routes } from './modules';
import AppRouter from './routes';

const App = () => (
  <IntlProvider locale="en">
    <AppRouter routes={routes} />
  </IntlProvider>
);

export default process.env.NODE_ENV === 'development' ? hot(module)(App) : App;
