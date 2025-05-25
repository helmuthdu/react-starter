import { render } from '@testing-library/react';
import { AppTest } from '../../app-test/app-test';
import { AppRouter } from '../app-router';

describe('App router', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <AppTest>
        <AppRouter routes={[]} />
      </AppTest>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
