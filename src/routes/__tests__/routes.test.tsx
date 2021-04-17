import { render } from '@testing-library/react';
import React from 'react';
import AppRouter from '../index';
import { RecoilRoot } from 'recoil';

describe('App router', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <RecoilRoot>
        <AppRouter routes={[]} />
      </RecoilRoot>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
