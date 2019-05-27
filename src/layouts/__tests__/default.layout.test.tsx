import { shallow } from 'enzyme';
import * as React from 'react';
import { DefaultLayout } from '../default.layout';

const component = <p>lorem ipsum</p>;

describe('layouts -> DefaultLayout component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<DefaultLayout component={component} />);
    expect(wrapper).toMatchSnapshot();
  });
});
