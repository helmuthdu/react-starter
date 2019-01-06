import { shallow } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { HomePage } from '../HomePage';

describe('Route -> Home component', () => {
  const initialState = { ui: { loading: 1 } };

  const props = {
    isLoading: false,
    dispatch: jest.fn(),
    toggleLoading: jest.fn(),
    linkTo: jest.fn(),
    store: configureMockStore()(initialState)
  };

  it('should match snapshot', () => {
    const wrapper = shallow(<HomePage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should renders welcome message', () => {
    const wrapper = shallow(<HomePage {...props} />);
    expect(wrapper.contains('Learn React')).toEqual(true);
  });

  it('should trigger linkTo method', () => {
    const wrapper = shallow(<HomePage {...props} />);
    wrapper
      .find('.App-link')
      .at(1)
      .simulate('click');
    expect(wrapper.instance().props.linkTo).toHaveBeenCalled();
  });
});
