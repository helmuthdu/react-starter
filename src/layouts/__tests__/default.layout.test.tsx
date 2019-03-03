import { shallow } from 'enzyme';
import React from 'react';
import { DefaultLayout, DefaultLayoutRoute } from '../default.layout';

describe('layouts -> DefaultLayout component', () => {
  it('should match snapshot', () => {
    const children = {
      props: {
        location: '/'
      }
    };
    const wrapper = shallow(<DefaultLayout children={children} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('layouts -> DefaultLayoutRoute component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<DefaultLayoutRoute />);
    expect(wrapper).toMatchSnapshot();
  });
});
