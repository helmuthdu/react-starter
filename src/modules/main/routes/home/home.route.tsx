import Link from 'next/link';
import React, { Component, HTMLAttributes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { AppState } from '../../../../pages/_app';
import { loading } from '../../../../stores/modules';
import { AUTH_ROUTES } from '../../../auth/routes';
import { MAIN_ROUTES } from '../index';

import './home.route.scss';

type StateProps = Readonly<{
  isLoading: boolean;
}>;

type DispatchProps = loading.Actions;

type OwnProps = HTMLAttributes<HTMLDivElement>;

export type Props = StateProps & DispatchProps & OwnProps;

type State = Readonly<{}>;

export class HomeRoute extends Component<Props, State> {
  public componentDidMount() {
    this.props.actionToggleLoading();

    return new Promise((resolve, reject) => {
      console.log('Before mounting HomePage component', this.props);
      return resolve();
    });
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header" onClick={this.props.actionToggleLoading}>
          <img src="/static/assets/images/logo.svg" className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
          Navigate to
          <Link href={MAIN_ROUTES.ABOUT}>
            <a className="App-link" title="go to about page">
              about page
            </a>
          </Link>
          or to
          <Link href={AUTH_ROUTES.SIGN_IN}>
            <a className="App-link" title="go to sign-in page">
              sign-in page
            </a>
          </Link>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  isLoading: loading.getters.isLoading(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      ...loading.actions
    },
    dispatch
  );

const enhance = compose<React.ComponentClass<OwnProps>>(
  connect<StateProps, DispatchProps, OwnProps, AppState>(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(HomeRoute);
