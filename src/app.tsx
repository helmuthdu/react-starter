import { AppError } from './components/app-error/app-error';
import { AppNotification } from './components/app-notifications/app-notifications';
import { AppRouter } from './components/app-router/app-router';
import { routes } from './routes';

const App = () => (
  <AppError>
    <AppRouter routes={routes} />
    <AppNotification />
  </AppError>
);

export default App;
