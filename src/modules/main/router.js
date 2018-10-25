import React, { lazy } from 'react';
import DefaultLayoutRoute from '../../layouts/DefaultLayout';

const HomePage = lazy(() => import('./routes/HomePage/HomePage'));
const About = lazy(() => import('./routes/About/About'));

export const MAIN_ROUTES = Object.freeze({
  ABOUT: '/about',
  HOME_PAGE: '/'
});

export const mainRoutes = [
  <DefaultLayoutRoute key={MAIN_ROUTES.ABOUT} path={MAIN_ROUTES.ABOUT} component={About} />,
  <DefaultLayoutRoute key={MAIN_ROUTES.HOME_PAGE} exact path={MAIN_ROUTES.HOME_PAGE} component={HomePage} />
];

export default mainRoutes;
