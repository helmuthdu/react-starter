import React, { lazy } from 'react';
import DefaultLayoutRoute from '../../layouts/DefaultLayout';

const HomePage = lazy(() => import('./routes/Home/HomeRoute'));
const About = lazy(() => import('./routes/About/AboutRoute'));

export const MAIN_ROUTES = Object.freeze({
  ABOUT: '/about',
  HOME: '/'
});

export const mainRoutes = [
  <DefaultLayoutRoute key={MAIN_ROUTES.ABOUT} path={MAIN_ROUTES.ABOUT} component={About} />,
  <DefaultLayoutRoute key={MAIN_ROUTES.HOME} exact path={MAIN_ROUTES.HOME} component={HomePage} />
];

export default mainRoutes;
