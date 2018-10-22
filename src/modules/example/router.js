import React from 'react';
import Loadable from 'react-loadable';
import DefaultLayoutRoute from './layouts/DefaultLayout';

const SignIn = Loadable({
  loader: () => import('./routes/SignIn/SignIn'),
  loading: () => null
});

export const AUTH_ROUTES = Object.freeze({
  SIGN_IN: '/sign-in'
});

export const authRoutes = [
  <DefaultLayoutRoute key={AUTH_ROUTES.SIGN_IN} path={AUTH_ROUTES.SIGN_IN} component={SignIn} />
];

export default authRoutes;
