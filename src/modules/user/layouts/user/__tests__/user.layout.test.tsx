import { render } from '@testing-library/react';
import React from 'react';
import { AppTest } from '../../../../../components/utils/app-test/app-test';
import { UserLayout, UserLayoutRoute } from '../user.layout';

const Component = () => <p>lorem ipsum</p>;

describe('user/layouts -> DefaultLayout component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <UserLayout>
        <Component />
      </UserLayout>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('user/layouts -> DefaultLayoutRoute component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <AppTest>
        <UserLayoutRoute element={Component} />
      </AppTest>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
