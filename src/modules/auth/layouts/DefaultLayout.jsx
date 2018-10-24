// @flow
import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
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
  return <Fragment>{children}</Fragment>;
};

export const DefaultLayoutRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(matchProps: DefaultLayoutProps) => (
        <DefaultLayout>
          <GlobalStyles />
          <Component {...matchProps} />
        </DefaultLayout>
      )}
    />
  );
};

export default DefaultLayoutRoute;
