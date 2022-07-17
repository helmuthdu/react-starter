import React from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router';
import { RecoilRoot } from 'recoil';
import { vi } from 'vitest';

export const AppTest = ({ children }: any) => (
  <IntlProvider locale="en" onError={vi.fn()}>
    <RecoilRoot>
      <MemoryRouter>{children}</MemoryRouter>
    </RecoilRoot>
  </IntlProvider>
);
