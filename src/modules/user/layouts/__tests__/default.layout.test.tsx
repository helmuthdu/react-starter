import { render } from '@testing-library/react';
import * as React from 'react';
import DefaultLayout from '../default.layout';

const component = () => <p>lorem ipsum</p>;

describe('layouts -> DefaultLayout component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<DefaultLayout component={component} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
