import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { ui } from '../../../../store/modules';
import { AUTH_ROUTES } from '../../../auth/router';
import logo from '../../assets/images/logo.svg';
import { MAIN_ROUTES } from '../../router';

import './HomeRoute.scss';

export class HomeRoute extends Component {
  componentDidMount() {
    new Promise((resolve, reject) => {
      console.log('Before mounting HomePage component', this.props);
      return resolve();
    });
    this.props.toggleLoading();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" onClick={this.props.toggleLoading}>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
          Navigate to
          <div className="App-link" onClick={() => this.props.linkTo(MAIN_ROUTES.ABOUT)} title="go to about page">
            about page
          </div>
          or to
          <div className="App-link" onClick={() => this.props.linkTo(AUTH_ROUTES.SIGN_IN)} title="go to sign-in page">
            sign-in page
          </div>
        </header>
      </div>
    );
  }
}

HomeRoute.propTypes = {
  isLoading: PropTypes.bool,
  toggleLoading: PropTypes.func,
  linkTo: PropTypes.func
};

const mapStateToProps = state => ({
  ...ui.getters
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      linkTo: path => push(path),
      ...ui.actions
    },
    dispatch
  );

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(HomeRoute);
