import { shallow } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import Page, { HomePage } from './HomePage';
import { Title } from './HomePage.styled';

describe('HomePage component', () => {
  const initialState = { ui: { loadingCount: 1 } };

  const props = {
    isLoading: false,
    dispatch: jest.fn(),
    toggleLoading: jest.fn(),
    changePage: jest.fn(),
    store: configureMockStore()(initialState)
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<Page {...props} />);
    expect(wrapper.instance() instanceof React.Component).toBeTruthy();
  });

  it('renders welcome message', () => {
    const wrapper = shallow(<HomePage {...props} />);
    const welcome = <Title>Welcome to React</Title>;
    expect(wrapper.contains(welcome)).toEqual(true);
  });

  it('should trigger changePage method', () => {
    const wrapper = shallow(<HomePage {...props} />);
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(wrapper.instance().props.changePage).toBeCalled();
  });
});
