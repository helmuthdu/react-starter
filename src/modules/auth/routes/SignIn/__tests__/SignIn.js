import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { initialState } from '../../../store/modules/auth';
import SignIn from '../SignIn';

describe('Route -> SignIn component', () => {
  const props = {
    isLogged: false,
    dispatch: jest.fn(),
    changePage: jest.fn()
  };

  const store = configureMockStore()({ auth: initialState });

  it('should match snapshot', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <SignIn {...props} />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
