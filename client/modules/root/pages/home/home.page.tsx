import DefaultLayout from '../../../../layouts/default/default.layout';
import React from 'react';
import { Home } from '../../components/home/home';

export const HomePage = () => {
  return (
    <DefaultLayout>
      <Home />
    </DefaultLayout>
  );
};

export default HomePage;
