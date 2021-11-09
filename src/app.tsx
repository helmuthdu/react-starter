import React from 'react';
import { routes } from './modules';
import AppRouter from './routes';
import { StoreProvider } from './stores';
import { ErrorBoundary } from './components/utils/error-boundary/error-boundary';
import { Notification } from './components/components/notification/notification';

const App = () => (
  <StoreProvider logger={process.env.NODE_ENV === 'development'}>
    <ErrorBoundary>
      <AppRouter routes={routes} />
      <Notification />
    </ErrorBoundary>
  </StoreProvider>
);

export default App;
