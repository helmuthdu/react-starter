import { shallow } from 'enzyme';
import React from 'react';
import { DefaultLayout } from '../default.layout';

describe('layouts -> DefaultLayout component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <DefaultLayout>
        <h1>Content</h1>
      </DefaultLayout>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
