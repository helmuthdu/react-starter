import React, { lazy } from 'react';
import DefaultLayoutRoute from './layouts/DefaultLayout';

const SignIn = lazy(() => import('./routes/SignIn/SignInRoute'));

export const AUTH_ROUTES = Object.freeze({
  SIGN_IN: '/sign-in'
});

export const authRoutes = [
  <DefaultLayoutRoute key={AUTH_ROUTES.SIGN_IN} path={AUTH_ROUTES.SIGN_IN} component={SignIn} />
];

export default authRoutes;
