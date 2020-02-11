import React from 'react';
import { render, hydrate } from 'react-dom';
import App from './app';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById('root') as HTMLDivElement;

if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// Sentry is an open-source error tracking tool that helps you monitor
// and fix crashes in real time. Here we cover everything about the
// product, the platform integrations, and our on-premise offering.
// Sentry.init({ dsn: 'https://<key>@sentry.io/<project>' });
