import React, { Fragment } from 'react';

import './default.layout.scss';

export const Container = ({ children }: any) => {
  return <Fragment>{children}</Fragment>;
};

export const DefaultLayout = ({ component: Component, ...props }: any) => {
  return (
    <Container>
      <Component {...props} />
    </Container>
  );
};

export default DefaultLayout;
