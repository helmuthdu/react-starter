import React, { Suspense } from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

import NotFoundRoute from './not-found/not-found.route';
import { Notification } from '../components/components/notification/notification';
import { I18nSwitch } from '../components/components/i18n/i18n-switch';
import { I18nRouter } from '../components/components/i18n/i18n-router';

export const AppRouter = ({ routes }: { routes: React.ReactNode[] }) => {
  return (
    <I18nRouter>
      <Suspense fallback={null}>
        <I18nSwitch>
          {routes}
          <Route path="not-found" component={NotFoundRoute} />
          <Redirect to="not-found" />
        </I18nSwitch>
      </Suspense>
      <Notification />
    </I18nRouter>
  );
};

export default AppRouter;
