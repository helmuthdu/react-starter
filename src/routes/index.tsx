import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import * as React from 'react';
import { Suspense } from 'react';
import { Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import NotFoundRoute from './not-found/not-found.route';

export const AppRoutes = ({ routes }: { routes: React.ReactNode }) => {
  return (
    <Suspense fallback={null}>
      <Switch>
        {routes}
        <Route path="/not-found" component={NotFoundRoute} />
        <Redirect to="/not-found" />
      </Switch>
    </Suspense>
  );
};

export const AppRouter = ({ history, routes }: { history: History; routes: React.ReactNode[] }) => {
  return (
    <ConnectedRouter history={history}>
      <AppRoutes routes={routes} />
    </ConnectedRouter>
  );
};

export default AppRouter;
