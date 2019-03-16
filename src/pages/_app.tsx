import App, { Container } from 'next/app';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
// modules
import * as authModule from '../modules/auth';
// store
import createStore from '../store';
import * as stores from '../store/modules';

export type AppState = authModule.State & {
  loading: stores.loading.State;
};

export default class extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Provider store={createStore([...authModule.stores, ...Object.values(stores)])}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}
