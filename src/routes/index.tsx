import React, { Suspense } from 'react';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NotFoundRoute from './not-found/not-found.route';

export const AppRouter = ({ routes }: { routes: React.ReactNode[] }) => {
  return (
    <Router>
      <Suspense fallback={null}>
        <Switch>
          {routes}
          <Route path="/not-found" component={NotFoundRoute} />
          <Redirect to="/not-found" />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
