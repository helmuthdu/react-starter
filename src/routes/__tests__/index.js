import { shallow } from 'enzyme';
import React from 'react';
import { AppRouter } from '..';

describe('App component', () => {
  const history = {
    location: {
      path: '/'
    }
  };

  it('should match snapshot', () => {
    const wrapper = shallow(<AppRouter history={history} />);
    expect(wrapper).toMatchSnapshot();
  });
});
