import React from 'react';
import { routes } from './modules';
import AppRouter from './routes';
import { Provider } from 'react-redux';
import { store } from './stores';
import { ErrorBoundary } from './components/utils/error-boundary/error-boundary';
import { Notification } from './components/components/notification/notification';

const App = () => (
  <Provider store={store}>
    <ErrorBoundary>
      <AppRouter routes={routes} />
      <Notification />
    </ErrorBoundary>
  </Provider>
);

export default App;
