import { shallow } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { initialState } from '../../../store/modules/auth';
import { Props, SignInRoute } from '../SignInRoute';

describe('Route -> SignIn component', () => {
  const props: Props = {
    name: 'john doe',
    getUser: jest.fn(),
    linkTo: jest.fn(),
    doLogin: jest.fn(),
    doLogout: jest.fn()
  };

  const state = {
    dispatch: jest.fn(),
    store: configureMockStore()({ auth: initialState })
  };

  it('should match snapshot', () => {
    const wrapper = shallow(<SignInRoute {...props} {...state} />);
    expect(wrapper).toMatchSnapshot();
  });
});
