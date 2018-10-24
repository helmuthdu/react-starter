import { shallow } from 'enzyme';
import React from 'react';
import { DefaultLayout, DefaultLayoutRoute } from './DefaultLayout';
import { shallowToJson } from 'enzyme-to-json';

describe('layouts -> DefaultLayout component', () => {
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

describe('layouts -> DefaultLayoutRoute component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<DefaultLayoutRoute />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
