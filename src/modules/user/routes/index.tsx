import { lazy } from 'react';
import { USER_ROUTES } from './paths';

const UserLayout = lazy(() => import('../layouts/user/user.layout'));
const SignInRoute = lazy(() => import('./sign-in/sign-in.route'));

export const routes = [
  {
    path: USER_ROUTES.ROOT,
    element: <UserLayout />,
    children: [{ index: true, element: <SignInRoute /> }],
  },
];
