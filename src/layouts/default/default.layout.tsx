import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import './default.layout.scss';

export const DefaultLayout = () => (
  <Fragment>
    <Outlet />
  </Fragment>
);

export default DefaultLayout;
