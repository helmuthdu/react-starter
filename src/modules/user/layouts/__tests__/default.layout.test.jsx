import { shallow } from 'enzyme';
import React from 'react';
import { DefaultLayout, DefaultLayoutRoute } from '../default.layout';

describe('auth/layouts -> DefaultLayout component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <DefaultLayout>
        <h1>Content</h1>
      </DefaultLayout>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('auth/layouts -> DefaultLayoutRoute component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<DefaultLayoutRoute />);
    expect(wrapper).toMatchSnapshot();
  });
});
