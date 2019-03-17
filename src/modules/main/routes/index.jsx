import React, { lazy } from 'react';
import DefaultLayoutRoute from '../../../layouts/default.layout';

const Home = lazy(() => import('./home/home.route'));
const About = lazy(() => import('./about/about.route'));

export const MAIN_ROUTES = Object.freeze({
  ABOUT: '/about',
  HOME: '/'
});

export const routes = [
  <DefaultLayoutRoute key={MAIN_ROUTES.ABOUT} path={MAIN_ROUTES.ABOUT} component={About} />,
  <DefaultLayoutRoute key={MAIN_ROUTES.HOME} exact path={MAIN_ROUTES.HOME} component={Home} />
];

export default routes;
