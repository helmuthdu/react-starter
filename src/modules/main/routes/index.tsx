import React, { lazy } from 'react';
import { MAIN_ROUTES } from './paths';

// Layout
const DefaultLayout = lazy(() => import('../../../layouts/default/default.layout'));
// Components
const HomeRoute = lazy(() => import('./home/home.route'));
const AboutRoute = lazy(() => import('./about/about.route'));

export const routes = [
  {
    path: MAIN_ROUTES.ROOT,
    element: <DefaultLayout />,
    children: [
      { index: true, element: <HomeRoute /> },
      { path: MAIN_ROUTES.ABOUT, element: <AboutRoute /> }
    ]
  }
];
