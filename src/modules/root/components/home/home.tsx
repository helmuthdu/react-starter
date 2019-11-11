import React from 'react';
import { FormattedMessage } from 'react-intl';
import { USER_URL, ROOT_URL } from '../../../urls';
import logo from '../../assets/images/logo.svg';

type Props = { onLinkClick: (route: USER_URL | ROOT_URL) => void };
export const Home = (props: Props) => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/app.tsx</code> and save to reload.
      </p>
      <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        <FormattedMessage id="LEARN_REACT" />
      </a>
      Navigate to
      <div className="App-link" onClick={() => props.onLinkClick(ROOT_URL.ABOUT)} title="go to about page">
        about page
      </div>
      or to
      <div className="App-link" onClick={() => props.onLinkClick(USER_URL.SIGN_IN)} title="go to sign-in page">
        sign-in page
      </div>
    </header>
  </div>
);
