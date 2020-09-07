import React from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router';
import { RecoilRoot } from 'recoil';

export const AppTest = ({ children }: any) => (
  <IntlProvider locale="en" onError={jest.fn()}>
    <RecoilRoot>
      <MemoryRouter>{children}</MemoryRouter>
    </RecoilRoot>
  </IntlProvider>
);
