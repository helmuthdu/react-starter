import React from 'react';
import { hot } from 'react-hot-loader/root';
import { IntlProvider } from 'react-intl';
import { StoreProvider } from './contexts/store/store.context';
import { routes } from './modules';
import AppRouter from './routes';
import { initialState, reducer } from './stores';

const App = () => (
  <IntlProvider locale="en">
    <StoreProvider initialState={initialState} reducer={reducer} logger>
      <AppRouter routes={routes} />
    </StoreProvider>
  </IntlProvider>
);

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
