import { shallow } from 'enzyme';
import React from 'react';
import { DefaultLayout, DefaultLayoutRoute } from './DefaultLayout';

describe('DefaultLayout component', () => {
  it('renders without crashing', () => {
    const children = {
      props: {
        location: '/'
      }
    };
    const wrapper = shallow(<DefaultLayout children={children} />);
    expect(wrapper.instance()).toBeNull();
  });
});

describe('DefaultLayoutRoute component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<DefaultLayoutRoute />);
    expect(wrapper.instance()).toBeNull();
  });
});
