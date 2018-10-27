import { shallow } from 'enzyme';
import React from 'react';
import { DefaultLayout, DefaultLayoutRoute } from '../DefaultLayout';

describe('auth/layouts -> DefaultLayout component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <DefaultLayout>
        <h1>Content</h1>
      </DefaultLayout>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('auth/layouts -> DefaultLayoutRoute component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<DefaultLayoutRoute />);
    expect(wrapper).toMatchSnapshot();
  });
});
