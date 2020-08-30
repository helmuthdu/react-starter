import { RouterContext } from 'next/dist/next-server/lib/router-context';
import React from 'react';
import { IntlProvider } from 'react-intl';

const mockedRouter = {
  back: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  route: '/mock-route',
  pathname: 'mock-path'
};

jest.mock('next/router', () => ({
  default: mockedRouter,
  useRouter: jest.fn(() => mockedRouter),
  withRouter: component => {
    component.defaultProps = {
      ...component.defaultProps,
      router: mockedRouter
    };
    return component;
  }
}));

type Props = { children: any };
export const AppTest = ({ children }: Props) => (
  <RouterContext.Provider value={mockedRouter as any}>
    <IntlProvider locale="en">{children}</IntlProvider>
  </RouterContext.Provider>
);
