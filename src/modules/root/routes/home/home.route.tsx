import * as Sentry from '@sentry/browser';
import React, { Component, ErrorInfo, HTMLAttributes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import DefaultLayout from '../../../../layouts/default/default.layout';
import { AppState } from '../../../../pages/_app';
import { loading } from '../../../../stores/modules';
import { Home } from '../../components/home/home.component';

import './home.route.scss';

type StateProps = Readonly<{
  isLoading: boolean;
}>;

type DispatchProps = loading.Actions;

type OwnProps = HTMLAttributes<HTMLDivElement>;

export type Props = StateProps & DispatchProps & OwnProps;

type State = Readonly<{ error: Error }>;

class HomeRoute extends Component<Props, State> {
  public componentDidMount() {
    this.props.actionToggleLoading();

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
    return (
      <DefaultLayout>
        <Home onImageClick={this.props.actionToggleLoading} />
      </DefaultLayout>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  isLoading: loading.selectors.isLoading(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      ...loading.actions
    },
    dispatch
  );

const enhance = compose<React.FunctionComponent<OwnProps>>(
  connect<StateProps, DispatchProps, OwnProps, AppState>(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(HomeRoute);
