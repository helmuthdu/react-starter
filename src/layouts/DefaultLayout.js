// @flow
import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

interface DefaultLayoutProps {
  children: any;
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <Fragment>
      <div>{children}</div>
    </Fragment>
  );
};

export const DefaultLayoutRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(matchProps: DefaultLayoutProps) => (
        <DefaultLayout>
          <Component {...matchProps} />
        </DefaultLayout>
      )}
    />
  );
};

export default DefaultLayoutRoute;
