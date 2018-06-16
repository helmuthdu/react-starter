import { shallow } from 'enzyme';
import React from 'react';
import HomePage from './HomePage';
import { Title } from './HomePage.styled';

it('renders without crashing', () => {
  shallow(<HomePage />);
});

it('renders welcome message', () => {
  const wrapper = shallow(<HomePage />);
  const welcome = <Title>Welcome to React</Title>;
  // expect(wrapper.contains(welcome)).to.equal(true);
  expect(wrapper.contains(welcome)).toEqual(true);
});
