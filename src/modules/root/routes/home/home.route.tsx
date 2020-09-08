import * as Sentry from '@sentry/browser';
import { push } from 'connected-react-router';
import React, { Component, ErrorInfo, HTMLAttributes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { AppState } from '../../../../app';
import { Home } from '../../components/home/home.component';

import './home.route.scss';

type StateProps = Readonly<{}>;

type DispatchProps = {
  linkTo: (path: string) => void;
};

type OwnProps = HTMLAttributes<HTMLDivElement>;

export type Props = StateProps & DispatchProps & OwnProps;

type State = Readonly<{ error: Error }>;

export class HomeRoute extends Component<Props, State> {
  public componentDidMount() {
    return new Promise((resolve, reject) => {
      console.log('Before mounting HomePage component', this.props);
      return resolve();
    });
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ error });
    Sentry.captureException(error);
  }

  public render() {
    return <Home onImageClick={() => undefined} onLinkClick={this.props.linkTo} />;
  }
}

const mapStateToProps = (state: AppState): StateProps => ({});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      linkTo: path => push(path)
    },
    dispatch
  );

const enhance = compose(connect<StateProps, DispatchProps, OwnProps, AppState>(mapStateToProps, mapDispatchToProps));

export default enhance(HomeRoute);
