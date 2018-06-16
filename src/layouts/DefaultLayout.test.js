import { shallow } from 'enzyme';
import React from 'react';
import DefaultLayout, { DefaultLayoutRoute } from './DefaultLayout';

it('renders without crashing', () => {
  shallow(<DefaultLayout />);
});

it('renders without crashing', () => {
  shallow(<DefaultLayoutRoute />);
});
