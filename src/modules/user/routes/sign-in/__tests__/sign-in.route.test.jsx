import { shallow } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { auth } from '../../../stores';
import SignInRoute from '../sign-in.route';

jest.mock('../../../stores', () => ({
  auth: {
    initialState: {
      name: 'foo'
    },
    actions: {
      actionGetUser: jest.fn(),
      actionLogout: jest.fn(),
      actionLogin: jest.fn()
    }
  }
}));

describe('Route -> SignIn', () => {
  const store = configureMockStore()({ auth: auth.initialState });

  it('should match snapshot', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <SignInRoute />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
