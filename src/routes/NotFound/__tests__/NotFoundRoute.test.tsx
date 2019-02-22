import { shallow } from 'enzyme';
import React from 'react';
import NotFoundRoute from '../NotFoundRoute';

describe('Route -> NotFound', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<NotFoundRoute />);
    expect(wrapper).toMatchSnapshot();
  });
});
