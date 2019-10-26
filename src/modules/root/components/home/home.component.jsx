import PropTypes from 'prop-types';
import React from 'react';
import { ROOT_ROUTES, USER_ROUTES } from '../../../routes';
import logo from '../../assets/images/logo.svg';

export const Home = props => (
  <div className="App">
    <header className="App-header">
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
      <div className="App-link" onClick={() => props.onLinkClick(USER_ROUTES.SIGN_IN)} title="go to sign-in page">
        sign-in page
      </div>
    </header>
  </div>
);

Home.propTypes = {
  onLinkClick: PropTypes.func.isRequired
};
