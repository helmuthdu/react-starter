import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { DefaultLayout, DefaultLayoutRoute } from '../default.layout';

const Component = () => <p>lorem ipsum</p>;

describe('layouts -> UserLayout component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <DefaultLayout>
        <Component />
      </DefaultLayout>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('layouts -> DefaultLayoutRoute component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <DefaultLayoutRoute component={Component} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
