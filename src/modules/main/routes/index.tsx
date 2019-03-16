import React from 'react';
import dynamic from 'next/dynamic';
import DefaultLayout from '../../../layouts/default.layout';

const Home = dynamic(() => import('./home/home.route'));
const About = dynamic(() => import('./about/about.route'));

export const MAIN_ROUTES = Object.freeze({
  ABOUT: '/about',
  HOME: '/'
});

export const AboutRoute = () => {
  return <DefaultLayout component={About} />;
};

export const HomeRoute = () => {
  return <DefaultLayout component={Home} />;
};
