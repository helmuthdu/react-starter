import { shallow } from 'enzyme';
import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { DefaultLayout, DefaultLayoutRoute } from './DefaultLayout';

describe('auth/layouts -> DefaultLayout component', () => {
  it('renders without crashing', () => {
    const children = {
      props: {
        location: '/'
      }
    };
    const wrapper = shallow(<DefaultLayout children={children} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe('auth/layouts -> DefaultLayoutRoute component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<DefaultLayoutRoute />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
