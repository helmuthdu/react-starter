import PropTypes from 'prop-types';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router';
import { StoreProvider } from '../../../contexts/store/store.context';
import { initialState, reducer } from '../../../stores';

export const AppTest = ({ children }) => (
  <IntlProvider locale="en">
    <StoreProvider initialState={initialState} reducer={reducer}>
      <MemoryRouter>{children}</MemoryRouter>
    </StoreProvider>
  </IntlProvider>
);

AppTest.propTypes = {
  children: PropTypes.node
};
