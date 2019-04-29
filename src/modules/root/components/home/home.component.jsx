import PropTypes from 'prop-types';
import React from 'react';
import { AUTH_ROUTES } from '../../../auth/routes';
import logo from '../../assets/images/logo.svg';
import { ROOT_ROUTES } from '../../routes';

export const Home = props => (
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

Home.propTypes = {
  onImageClick: PropTypes.func.isRequired,
  onLinkClick: PropTypes.func.isRequired
};
