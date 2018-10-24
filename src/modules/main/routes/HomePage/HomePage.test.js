import { shallow } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallowToJson } from 'enzyme-to-json';
import { HomePage } from './HomePage';
import { Button, Title } from './HomePage.styled';

describe('Route -> Home component', () => {
  const initialState = { ui: { loading: 1 } };

  const props = {
    isLoading: false,
    dispatch: jest.fn(),
    toggleLoading: jest.fn(),
    changePage: jest.fn(),
    store: configureMockStore()(initialState)
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<HomePage {...props} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renders welcome message', () => {
    const wrapper = shallow(<HomePage {...props} />);
    const welcome = <Title>Welcome to React</Title>;
    expect(wrapper.contains(welcome)).toEqual(true);
  });

  it('should trigger changePage method', () => {
    const wrapper = shallow(<HomePage {...props} />);
    wrapper
      .find(Button)
      .at(0)
      .simulate('click');
    expect(wrapper.instance().props.changePage).toBeCalled();
  });
});
