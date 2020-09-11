import { StoreProvider } from '@/stores';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import React from 'react';
import { IntlProvider } from 'react-intl';

const router = jest.mock('next/router', () => {
  const mockedRouter = {
    back: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    route: '/mock-route',
    pathname: 'mock-path'
  };
  return {
    default: mockedRouter,
    useRouter: jest.fn(() => mockedRouter),
    withRouter: component => {
      component.defaultProps = {
        ...component.defaultProps,
        router: mockedRouter
      };
      return component;
    }
  };
});

type Props = { children: any };
export const AppTest = ({ children }: Props) => (
  <RouterContext.Provider value={router as any}>
    <StoreProvider>
      <IntlProvider locale="en">{children}</IntlProvider>
    </StoreProvider>
  </RouterContext.Provider>
);
