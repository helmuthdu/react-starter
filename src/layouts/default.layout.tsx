import * as React from 'react';
import { Fragment } from 'react';

import './default.layout.scss';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <Fragment>{children}</Fragment>;
};

// eslint-disable-next-line
export const DefaultLayout = ({ component: Component, ...props }: { component: any } & object) => {
  return (
    <Container>
      <Component {...props} />
    </Container>
  );
};

export default DefaultLayout;
