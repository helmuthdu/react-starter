import React, { lazy } from 'react';
import DefaultLayoutRoute from '../layouts/default.layout';

const SignIn = lazy(() => import('./sign-in/sign-in.route'));

export const AUTH_ROUTES = Object.freeze({
  SIGN_IN: '/sign-in'
});

export const routes = [<DefaultLayoutRoute key={AUTH_ROUTES.SIGN_IN} path={AUTH_ROUTES.SIGN_IN} component={SignIn} />];

export default routes;
