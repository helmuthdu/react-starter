import { shallow } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { HomeRoute, Props } from '../home.route';

describe('Route -> Home', () => {
  const initialState = { ui: { loading: 1 } };

  const props = {
    isLoading: false,
    dispatch: jest.fn(),
    enableLoading: jest.fn(),
    disableLoading: jest.fn(),
    toggleLoading: jest.fn(),
    linkTo: jest.fn(),
    store: configureMockStore()(initialState)
  };

  it('should match snapshot', () => {
    const wrapper = shallow(<HomeRoute {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should renders welcome message', () => {
    const wrapper = shallow(<HomeRoute {...props} />);
    expect(wrapper.contains('Learn React')).toEqual(true);
  });

  it('should trigger linkTo method', () => {
    const wrapper = shallow(<HomeRoute {...props} />);
    wrapper
      .find('.App-link')
      .at(1)
      .simulate('click');
    expect((wrapper.instance().props as Props).linkTo).toHaveBeenCalled();
  });
});
