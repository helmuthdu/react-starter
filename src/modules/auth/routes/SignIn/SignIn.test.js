import { shallow } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { initialState } from '../../store';
import { shallowToJson } from 'enzyme-to-json';
import SignIn from './SignIn';

describe('Route -> SignIn component', () => {
  const props = {
    isLogged: false,
    dispatch: jest.fn(),
    changePage: jest.fn(),
    store: configureMockStore()({ auth: initialState })
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<SignIn {...props} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
