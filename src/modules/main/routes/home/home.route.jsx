import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { loading } from '../../../../store/modules';
import { AUTH_ROUTES } from '../../../auth/routes';
import logo from '../../assets/images/logo.svg';
import { MAIN_ROUTES } from '../index';

import './home.route.scss';

export class HomeRoute extends Component {
  componentDidMount() {
    new Promise((resolve, reject) => {
      console.log('Before mounting HomePage component', this.props);
      return resolve();
    });
    this.props.actionToggleLoading();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" onClick={this.props.actionToggleLoading}>
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
  actionToggleLoading: PropTypes.func,
  isLoading: PropTypes.bool,
  linkTo: PropTypes.func
};

const mapStateToProps = state => ({
  isLoading: loading.getters.isLoading(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      linkTo: path => push(path),
      ...loading.actions
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
