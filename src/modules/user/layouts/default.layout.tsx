import * as React from 'react';
import { Fragment } from 'react';

import './default.layout.scss';

// eslint-disable-next-line
export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return <Fragment>{children}</Fragment>;
};

export default DefaultLayout;
