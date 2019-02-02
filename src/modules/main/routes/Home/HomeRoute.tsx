import { push } from 'connected-react-router';
import React, { Component, HTMLAttributes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { AppState } from '../../../../index';
import { toggleLoading } from '../../../../store/modules/ui';
import { isLoading } from '../../../../store/modules/ui/getters';
import { AUTH_ROUTES } from '../../../auth/router';
import logo from '../../assets/images/logo.svg';
import { MAIN_ROUTES } from '../../router';

import './HomeRoute.scss';

type State = {};

type StateProps = {
  isLoading: boolean;
};

type DispatchProps = {
  toggleLoading: () => void;
  linkTo: (path: string) => void;
};

type OwnProps = HTMLAttributes<HTMLDivElement>;

export type Props = StateProps & DispatchProps & OwnProps;

export class HomeRoute extends Component<Props, State> {
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

const mapStateToProps = (state: AppState): StateProps => ({
  isLoading: isLoading(state.ui)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      toggleLoading,
      linkTo: path => push(path)
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
