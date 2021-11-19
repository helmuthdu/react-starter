import React from 'react';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary } from './components/utils/error-boundary/error-boundary';
import { routes } from './modules';
import AppRouter from './routes';
import { Notification } from './components/components/notifications/notifications';

const App = () => (
  <RecoilRoot>
    <ErrorBoundary>
      <AppRouter routes={routes} />
      <Notification />
    </ErrorBoundary>
  </RecoilRoot>
);

export default App;
