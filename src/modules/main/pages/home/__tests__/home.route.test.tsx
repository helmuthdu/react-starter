import { render } from '@testing-library/react';
import { AppTest } from '@/components/utils/app-test';
import HomePage from '../home.page';

describe('Route -> Home', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <AppTest>
        <HomePage />
      </AppTest>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
