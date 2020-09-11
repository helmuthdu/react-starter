import PropTypes from 'prop-types';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router';
import { StoreProvider } from '../../../stores';

export const AppTest = ({ children }) => (
  <IntlProvider locale="en">
    <StoreProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </StoreProvider>
  </IntlProvider>
);

AppTest.propTypes = {
  children: PropTypes.node
};
