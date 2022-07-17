import { render } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import AppRouter from '../index';

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
