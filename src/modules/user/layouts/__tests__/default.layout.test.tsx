import { shallow } from 'enzyme';
import * as React from 'react';
import { DefaultLayout, DefaultLayoutRoute } from '../default.layout';

const component = <p>lorem ipsum</p>;

describe('auth/layouts -> DefaultLayout component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<DefaultLayout>{component}</DefaultLayout>);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('auth/layouts -> DefaultLayoutRoute component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<DefaultLayoutRoute component={() => component} />);
    expect(wrapper).toMatchSnapshot();
  });
});
