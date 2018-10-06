import React from 'react';
import Loadable from 'react-loadable';
import DefaultLayoutRoute from '../../layouts/DefaultLayout';

const HomePage = Loadable({
  loader: () => import('./routes/HomePage/HomePage'),
  loading: () => null
});

const About = Loadable({
  loader: () => import('./routes/About/About'),
  loading: () => null
});

export const MAIN_ROUTES = Object.freeze({
  ABOUT: '/about',
  HOME_PAGE: '/'
});

export const mainRoutes = [
  <DefaultLayoutRoute key={MAIN_ROUTES.ABOUT} path={MAIN_ROUTES.ABOUT} component={About} />,
  <DefaultLayoutRoute key={MAIN_ROUTES.HOME_PAGE} exact path={MAIN_ROUTES.HOME_PAGE} component={HomePage} />
];

export default mainRoutes;
