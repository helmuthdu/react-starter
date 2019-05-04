import * as Sentry from '@sentry/browser';
import React from 'react';
import { render } from 'react-dom';
import App from './app';
import * as serviceWorker from './serviceWorker';

render(<App />, document.querySelector('#root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// Sentry is an open-source error tracking tool that helps you monitor
// and fix crashes in real time. Here we cover everything about the
// product, the platform integrations, and our on-premise offering.
Sentry.init({ dsn: 'https://<key>@sentry.io/<project>' });
