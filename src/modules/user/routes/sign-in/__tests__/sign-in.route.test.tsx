import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { initialState } from '../../../stores/modules/user';
import SignInRoute, { Props } from '../sign-in.route';

describe('Route -> SignIn component', () => {
  const props = {
    name: 'john doe'
  };

  const store = configureMockStore()({ user: initialState });

  it('should match snapshot', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SignInRoute {...props} />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
