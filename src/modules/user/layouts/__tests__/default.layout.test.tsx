import { render } from '@testing-library/react';
import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { DefaultLayout, DefaultLayoutRoute } from '../default.layout';

const component = () => <p>lorem ipsum</p>;

describe('auth/layouts -> DefaultLayout component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<DefaultLayout component={component} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('auth/layouts -> DefaultLayoutRoute component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <DefaultLayoutRoute component={component} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
