import React, { Fragment } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import './user.layout.scss';

export const UserLayout = ({ children }: { children: React.ReactNode }) => <Fragment>{children}</Fragment>;

// eslint-disable-next-line
export const UserLayoutRoute = ({ component: Component, ...rest }: { component: any } & RouteProps) => (
  <Route
    {...rest}
    render={(matchProps: object) => (
      <UserLayout>
        <Component {...matchProps} />
      </UserLayout>
    )}
  />
);

export default UserLayoutRoute;
