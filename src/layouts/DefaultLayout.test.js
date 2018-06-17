import { shallow } from 'enzyme';
import React from 'react';
import { DefaultLayout, DefaultLayoutRoute } from './DefaultLayout';

it('renders without crashing', () => {
  const children = 'Hello World';
  const wrapper = shallow(<DefaultLayout children={children} />);
  expect(wrapper.instance()).toBeNull();
});

it('renders without crashing', () => {
  const wrapper = shallow(<DefaultLayoutRoute />);
  expect(wrapper.instance()).toBeNull();
});
