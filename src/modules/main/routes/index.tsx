import React, { lazy } from 'react';
import DefaultLayoutRoute from '../../../layouts/default/default.layout';
import { MAIN_ROUTES } from './paths';

const HomeRoute = lazy(() => import('./home/home.route'));
const AboutRoute = lazy(() => import('./about/about.route'));

export const routes = [
  <DefaultLayoutRoute key={MAIN_ROUTES.ABOUT} path={MAIN_ROUTES.ABOUT} component={AboutRoute} />,
  <DefaultLayoutRoute key={MAIN_ROUTES.HOME} exact path={MAIN_ROUTES.HOME} component={HomeRoute} />
];
