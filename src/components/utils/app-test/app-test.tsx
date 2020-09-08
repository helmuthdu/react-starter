import React from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router';
import { StoreProvider } from '../../../stores';

export const AppTest = ({ children }: any) => (
  <IntlProvider locale="en" onError={jest.fn()}>
    <StoreProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </StoreProvider>
  </IntlProvider>
);
