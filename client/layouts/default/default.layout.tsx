import React, { Fragment } from 'react';

import './default.layout.scss';

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return <Fragment>{children}</Fragment>;
};

export default DefaultLayout;
