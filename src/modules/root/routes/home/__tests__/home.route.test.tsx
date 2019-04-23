import { mount } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { HomeRoute, Props } from '../home.route';

describe('Route -> Home', () => {
  const initialState = { loading: { count: 1 } };

  const props = {
    actionDisableLoading: jest.fn(),
    actionEnableLoading: jest.fn(),
    actionToggleLoading: jest.fn(),
    dispatch: jest.fn(),
    isLoading: false,
    linkTo: jest.fn(),
    store: configureMockStore()(initialState)
  };

  it('should match snapshot', () => {
    const wrapper = mount(<HomeRoute {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should renders welcome message', () => {
    const wrapper = mount(<HomeRoute {...props} />);
    expect(wrapper.contains('Learn React')).toEqual(true);
  });

  it('should trigger linkTo method', () => {
    const wrapper = mount(<HomeRoute {...props} />);
    wrapper
      .find('.App-link')
      .at(1)
      .simulate('click');
    expect((wrapper.instance().props as Props).linkTo).toHaveBeenCalled();
  });
});
