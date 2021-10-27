import React from 'react';
import { hot } from 'react-hot-loader/root';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary } from './components/utils/error-boundary/error-boundary';
import { routes } from './modules';
import AppRouter from './routes';
import { Notification } from './components/components/notification/notification';

const App = () => (
  <RecoilRoot>
    <ErrorBoundary>
      <AppRouter routes={routes} />
      <Notification />
    </ErrorBoundary>
  </RecoilRoot>
);

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
