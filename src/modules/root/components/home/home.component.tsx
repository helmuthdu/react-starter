import React from 'react';
import { AUTH_ROUTES } from '../../../auth/routes';
import logo from '../../assets/images/logo.svg';
import { ROOT_ROUTES } from '../../routes';

type Props = { onImageClick: () => void; onLinkClick: (route: AUTH_ROUTES | ROOT_ROUTES) => void };

export const Home = (props: Props) => (
  <div className="App">
    <header className="App-header" onClick={props.onImageClick}>
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>
      Navigate to
      <div className="App-link" onClick={() => props.onLinkClick(ROOT_ROUTES.ABOUT)} title="go to about page">
        about page
      </div>
      or to
      <div className="App-link" onClick={() => props.onLinkClick(AUTH_ROUTES.SIGN_IN)} title="go to sign-in page">
        sign-in page
      </div>
    </header>
  </div>
);
