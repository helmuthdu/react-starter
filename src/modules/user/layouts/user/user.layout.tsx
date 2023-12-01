import './user.layout.css';
import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

export const UserLayout = () => (
  <Fragment>
    <Outlet />
  </Fragment>
);

export default UserLayout;
