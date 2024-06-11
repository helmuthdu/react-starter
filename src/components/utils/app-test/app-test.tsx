import type { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router';
import { RecoilRoot } from 'recoil';
import { vi } from 'vitest';

export const AppTest = ({ children }: { children: ReactNode }) => (
  <IntlProvider locale="en" onError={vi.fn()}>
    <RecoilRoot>
      <MemoryRouter>{children}</MemoryRouter>
    </RecoilRoot>
  </IntlProvider>
);
