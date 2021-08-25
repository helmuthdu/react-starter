import { RouterContext } from 'next/dist/shared/lib/router-context';
import { IntlProvider } from 'react-intl';
import { RecoilRoot } from 'recoil';

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
    withRouter: (component: any) => {
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
    <RecoilRoot>
      <IntlProvider locale="en" onError={() => undefined}>
        {children}
      </IntlProvider>
    </RecoilRoot>
  </RouterContext.Provider>
);
