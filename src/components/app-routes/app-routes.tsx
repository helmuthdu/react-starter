import { Suspense } from 'react';
import { type RouteObject, useRoutes } from 'react-router';

export const NotFoundRoute = () => (
  <div>
    <h1>You are here!</h1>
    <h2>But nothing found for you #404</h2>
  </div>
);

export const AppRoutes = ({ routes }: { routes: RouteObject[] }) => {
  const component = useRoutes([
    ...routes,
    {
      element: <NotFoundRoute />,
      path: 'not-found',
    },
    {
      element: <NotFoundRoute />,
      path: '*',
    },
  ]);

  return <Suspense fallback={null}>{component}</Suspense>;
};
