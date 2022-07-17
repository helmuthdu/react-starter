import React from 'react';
import { FormattedMessage } from 'react-intl';
import { MAIN_ROUTES, USER_ROUTES } from '../../../paths';
import logo from '../../assets/images/logo.svg';
import './home.css';

type Props = { onLinkClick: (route: USER_ROUTES | MAIN_ROUTES) => void };
export const Home = (props: Props) => (
  <div className="app">
    <header className="app-header">
      <img src={logo} className="app-logo" alt="logo" />
      <p>
        Edit <code>src/app.tsx</code> and save to reload.
      </p>
      <a className="app-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        <FormattedMessage id="LEARN_REACT" />
      </a>
      Navigate to
      <div className="app-link" onClick={() => props.onLinkClick(MAIN_ROUTES.ABOUT)} title="go to about page">
        about page
      </div>
      or to
      <div className="app-link" onClick={() => props.onLinkClick(USER_ROUTES.SIGN_IN)} title="go to sign-in page">
        sign-in page
      </div>
    </header>
  </div>
);
