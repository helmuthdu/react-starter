// @flow
import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { injectGlobal } from 'styled-components';

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Montserrat|Source+Sans+Pro');

  body,
  html {
    overflow-y: auto;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    font-family: 'Source Sans Pro';
    background-color: #ffffff;
    font-size: 16px;
  }
`;

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
