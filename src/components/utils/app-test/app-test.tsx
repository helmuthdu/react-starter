import React from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../../../stores';

export const AppTest = ({ children }: any) => (
  <IntlProvider locale="en" onError={jest.fn()}>
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  </IntlProvider>
);
