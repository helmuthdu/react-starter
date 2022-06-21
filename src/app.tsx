import React from 'react';
import { Provider } from 'react-redux';
import { Notification } from './components/components/notifications/notifications';
import { ErrorBoundary } from './components/utils/error-boundary/error-boundary';
import { routes } from './modules';
import AppRouter from './routes';
import { store } from './stores';

const App = () => (
  <Provider store={store}>
    <ErrorBoundary>
      <AppRouter routes={routes} />
      <Notification />
    </ErrorBoundary>
  </Provider>
);

export default App;
