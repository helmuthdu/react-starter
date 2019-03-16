import { shallow } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { initialState } from '../../../store/modules/auth';
import { Props, SignInRoute } from '../sign-in.route';

describe('Route -> SignIn component', () => {
  const props: Props = {
    actionGetUser: jest.fn(),
    actionLogin: jest.fn(),
    actionLogout: jest.fn(),
    linkTo: jest.fn(),
    name: 'john doe'
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
