import { RecoilRoot } from 'recoil';
import { Notification } from './components/components/notifications/notifications';
import { ErrorBoundary } from './components/utils/error-boundary/error-boundary';
import { routes } from './modules';
import AppRouter from './routes';

const App = () => (
  <RecoilRoot>
    <ErrorBoundary>
      <AppRouter routes={routes} />
      <Notification />
    </ErrorBoundary>
  </RecoilRoot>
);

export default App;
