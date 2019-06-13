import React, { lazy } from 'react';
import DefaultLayoutRoute from '../../../layouts/default/default.layout';
import { ROOT_ROUTES } from './paths';

const HomeRoute = lazy(() => import('./home/home.route'));
const AboutRoute = lazy(() => import('./about/about.route'));

export const routes = [
  <DefaultLayoutRoute key={ROOT_ROUTES.ABOUT} path={ROOT_ROUTES.ABOUT} component={AboutRoute} />,
  <DefaultLayoutRoute key={ROOT_ROUTES.HOME} exact path={ROOT_ROUTES.HOME} component={HomeRoute} />
];

export default routes;
