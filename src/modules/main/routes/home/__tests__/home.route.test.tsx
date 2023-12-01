import { render } from '@testing-library/react';
import { AppTest } from '../../../../../components/utils/app-test/app-test';
import HomeRoute from '../home.route';

describe('Route -> Home', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <AppTest>
        <HomeRoute />
      </AppTest>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
