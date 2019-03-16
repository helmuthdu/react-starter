import { shallow } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { HomeRoute } from '../home.route';

describe('Route -> Home', () => {
  const initialState = { loading: { count: 1 } };

  const props = {
    actionDisableLoading: jest.fn(),
    actionEnableLoading: jest.fn(),
    actionToggleLoading: jest.fn(),
    dispatch: jest.fn(),
    isLoading: false,
    store: configureMockStore()(initialState)
  };

  it('should match snapshot', () => {
    const wrapper = shallow(<HomeRoute {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
