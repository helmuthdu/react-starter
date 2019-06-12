import Link from 'next/link';
import * as React from 'react';
import { USER_ROUTES } from '../../../user/routes/paths';
import { ROOT_ROUTES } from '../../routes/paths';

type Props = { onImageClick: () => void };

export const Home = (props: Props) => (
  <div className="App">
    <header className="App-header" onClick={props.onImageClick}>
      <img src="/static/assets/images/logo.svg" className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>
      Navigate to
      <Link href={ROOT_ROUTES.ABOUT}>
        <a className="App-link" title="go to about page">
          about page
        </a>
      </Link>
      or to
      <Link href={USER_ROUTES.SIGN_IN}>
        <a className="App-link" title="go to sign-in page">
          sign-in page
        </a>
      </Link>
    </header>
  </div>
);
