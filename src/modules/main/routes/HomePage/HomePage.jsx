// @flow
import { push } from 'connected-react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleLoading } from '../../../../store/modules/ui';
import { isLoading } from '../../../../store/modules/ui/getters';
import { AUTH_ROUTES } from '../../../auth/router';
import logo from '../../assets/images/logo.svg';
import { MAIN_ROUTES } from '../../router';

import './HomePage.scss';

type Props = {
  isLoading: boolean,
  toggleLoading: () => void,
  linkTo: (path: string) => void
};

export class HomePage extends Component<Props> {
  async componentDidMount() {
    await new Promise((resolve, reject) => {
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

const mapStateToProps = state => ({
  isLoading: isLoading(state.ui)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleLoading,
      linkTo: path => push(path)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
