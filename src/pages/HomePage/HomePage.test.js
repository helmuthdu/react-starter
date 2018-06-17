import { shallow } from 'enzyme';
import React from 'react';
import { HomePage } from './HomePage';
import { Title } from './HomePage.styled';

describe('HomePage component', () => {
  const props = {
    isLoading: false,
    dispatch: jest.fn(),
    toggleLoading: jest.fn()
  };

  const wrapper = shallow(<HomePage {...props} />);

  it('renders without crashing', () => {
    expect(wrapper.instance() instanceof React.Component).toBeTruthy();
  });

  it('renders welcome message', () => {
    const welcome = <Title>Welcome to React</Title>;
    expect(wrapper.contains(welcome)).toEqual(true);
  });
});
