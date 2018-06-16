import { shallow } from 'enzyme';
import React from 'react';
import HomePage from './HomePage';

it('renders without crashing', () => {
  shallow(<HomePage />);
});

it('renders welcome message', () => {
  const wrapper = shallow(<HomePage />);
  const welcome = <h2>Welcome to React</h2>;
  // expect(wrapper.contains(welcome)).to.equal(true);
  expect(wrapper.contains(welcome)).toEqual(true);
});
