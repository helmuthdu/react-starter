import React from 'react';
import { useHistory } from 'react-router';
import { Home } from '../../components/home/home.component';

import './home.route.scss';

export const HomeRoute = () => {
  const { push } = useHistory();

  return <Home onLinkClick={push} />;
};

export default HomeRoute;
